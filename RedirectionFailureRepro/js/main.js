function log(text) {
    const p = document.createElement("p");
    p.textContent = text;
    document.body.appendChild(p);
}

function tryFetch() {
    fetchXHR("https://issues.microsoft.com/").then(() => log("Redirection success"), error => log(`Redirection failure: ${error.message || error}`));
    fetchXHR("https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/").then(() => log("Direct fetch success"), error => log(`Direct fetch failure: ${error}`));
}
tryFetch();

/**
 * Why XHR? Because the native Fetch API blocks every call with "SEC7120: Origin 'null' not found in Access-Control-Allow-Origin header"
 */
function fetchXHR(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = "text";
        xhr.onload = () => resolve(xhr.response);
        xhr.onerror = reject;
        xhr.send();
    });
}