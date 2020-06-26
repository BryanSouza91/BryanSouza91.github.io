// Materialize CSS Logic
document.addEventListener('DOMContentLoaded', function() {
    // SideNav logic
    var sidenavEl = document.querySelectorAll('.sidenav');
    var sidenav = M.Sidenav.init(sidenavEl);

    // Dropdown logic
    var dropdownEl = document.querySelectorAll('.dropdown-trigger');
    var dropdown = M.Dropdown.init(dropdownEl);

    // Collapsible logic
    var collapseEl = document.querySelectorAll('.collapsible');
    var collapse = M.Collapsible.init(collapseEl);

    // Image Material Boxed logic
    var imgEl = document.querySelectorAll('.materialboxed');
    var img = M.Materialbox.init(imgEl);

    // Parallax logic
    var parallaxEl = document.querySelectorAll('.parallax');
    var para = M.Parallax.init(parallaxEl);
});

// Image Loader logic
const ImageLoaderWorker = new Worker('/js/workers/image-loader.worker.js')
const imgElements = document.querySelectorAll('img[data-src]')


// We should attach the listener before we pass image URLs to the web worker
// to catch messages sent prior to the event being attached
ImageLoaderWorker.addEventListener('message', event => {
    // Get the message data from the event
    const imageData = event.data

    // Select the original element for this image
    const imageElement = document.querySelectorAll(`img[data-src='${imageData.imageURL}']`)

    // We can use the `Blob` as an image source
    // We just need to convert it to an object URL first
    const objectURL = URL.createObjectURL(imageData.blob)

    // Once the image is loaded, cleanup memory
    imageElement.onload = () => {
        // Remove the original `data-src` attribute to make sure we don't
        // accidentally pass this image to the worker again in the future
        imageElement.removeAttribute('data-src')

        // Also revoke the object URL now that it's been used to cleanup
        URL.revokeObjectURL(objectURL)
    }
    imageElement[0].setAttribute('src', objectURL)
})

imgElements.forEach(imageElement => {
    const imageURL = imageElement.getAttribute('data-src')
    ImageLoaderWorker.postMessage(imageURL)
})