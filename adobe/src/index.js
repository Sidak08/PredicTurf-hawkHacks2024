/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import AddOnSdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

const IMAGES = new Map([
    ["1.png", "./images/1.png"],
    ["2.png", "./images/2.png"],
    ["3.png", "./images/3.png"],
    ["4.png", "./images/4.png"],
    ["5.png", "./images/5.png"],
    ["6.png", "./images/6.png"]
]);

let gallery;

// Wait for the SDK to be ready before rendering elements in the DOM.
AddOnSdk.ready.then(async () => {
    // Create elements in the DOM.
    gallery = document.createElement("div");
    gallery.className = "gallery";

    IMAGES.forEach((url, id) => {
        const image = document.createElement("img");
        image.id = id;
        image.src = url;
        image.addEventListener("click", addToDocument);

        // Enable drag to document for the image.
        AddOnSdk.app.enableDragToDocument(image, {
            previewCallback: element => {
                return new URL(element.src);
            },
            completionCallback: async element => {
                return [{ blob: await getBlob(element.src) }];
            }
        });

        gallery.appendChild(image);
    });

    // Register event handler for "dragstart" event
    AddOnSdk.app.on("dragstart", startDrag);
    // Register event handler for 'dragend' event
    AddOnSdk.app.on("dragend", endDrag);

    document.body.appendChild(gallery);
});

/**
 * Add image to the document.
 */
async function addToDocument(event) {
    const url = event.currentTarget.src;
    const blob = await getBlob(url);
    AddOnSdk.app.document.addImage(blob);
}

/**
 * Handle "dragstart" event
 */
function startDrag(eventData) {
    console.log("The drag event has started for", eventData.element.id);
}

/**
 * Handle "dragend" event
 */
function endDrag(eventData) {
    if (!eventData.dropCancelled) {
        console.log("The drag event has ended for", eventData.element.id);
    } else {
        console.log("The drag event was cancelled for", eventData.element.id);
    }
}

/**
 * Get the binary object for the image.
 */
async function getBlob(url) {
    return await fetch(url).then(response => response.blob());
}
