import setText, { appendText } from "./results.mjs";

export function timeout(){
    const wait = new Promise((resolve) => {
        setTimeout(() => {
            resolve("Timeout!");
        }, 1500);
    });

    wait.then(text => setText(text));
}

export function interval(){
    let counter = 0;

    const wait = new Promise((resolve) => {
        setInterval(() => {
            console.log("INTERVAL");

            resolve(`Timeout! ${++counter}`);
        }, 1500);
    });

    wait.then(text => setText(text))
        .finally(() => appendText(` -- Done ${counter}`));
}

export function clearIntervalChain(){
    let counter = 0;
    let interval;

    const wait = new Promise((resolve) => {
        interval = setInterval(() => {
            console.log("INTERVAL");

            resolve(`Timeout! ${++counter}`);
        }, 1500);
    });

    wait.then(text => setText(text))
        .finally(() => clearInterval(interval));
}

export function xhr(){
    let request = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/users/7");
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.responseText);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject("Request Failed");
        xhr.send();
    });

    request.then(result => setText(result))
        .catch(reason => setText(reason));
}

export function allPromises(){
    /*
    The Promise.all() method takes an iterable of promises as an input, and
    returns a single Promise that resolves to an array of the results of
    the input promises. This returned promise will resolve when all of the
    input's promises have resolved, or if the input iterable contains no promises.
    It rejects immediately upon any of the input promises rejecting or non-promises
    throwing an error, and will reject with this first rejection message / error.
    */

    let categories = axios.get("http://localhost:3000/itemCategories");
    let statuses = axios.get("http://localhost:3000/orderStatuses");
    let userTypes = axios.get("http://localhost:3000/userTypes");
    let addressTypes =  axios.get("http://localhost:3000/addressTypes");

    Promise.all([categories, statuses, userTypes, addressTypes])
        .then(([cat, stat, type, address]) => {
            setText("");

            appendText(JSON.stringify(cat.data));
            appendText(JSON.stringify(stat.data));
            appendText(JSON.stringify(type.data));
            appendText(JSON.stringify(address.data));
        }).catch(reasons => {
            setText(reasons);
        });
}

export function allSettled(){
    /*
    The Promise.allSettled() method returns a promise that resolves after all
    of the given promises have either fulfilled or rejected, with an array of objects
    that each describes the outcome of each promise.

    It is typically used when you have multiple asynchronous tasks that are not
    dependent on one another to complete successfully, or you'd always like to
    know the result of each promise.

    In comparison, the Promise returned by Promise.all() may be more appropriate
    if the tasks are dependent on each other / if you'd like to immediately reject
    upon any of them rejecting.
    */

    let categories = axios.get("http://localhost:3000/itemCategories");
    let statuses = axios.get("http://localhost:3000/orderStatuses");
    let userTypes = axios.get("http://localhost:3000/userTypes");
    let addressTypes =  axios.get("http://localhost:3000/addressTypes");

    Promise.allSettled([categories, statuses, userTypes, addressTypes])
        .then((values) => {
            let results = values.map(v => {
                if (v.status === "fulfilled") {
                    return `FULFILLED: ${JSON.stringify(v.value.data[0])} `;
                }

                return `REJECTED: ${v.reason.message} `;
            })

            setText(results);
        }).catch(reasons => {
            setText(reasons);
        });
}

export function race(){
    /*
    The Promise.race() method returns a promise that fulfills or rejects as soon
    as one of the promises in an iterable fulfills or rejects, with the value or
    reason from that promise.
    */

    let users = axios.get("http://localhost:3000/users");
    let backup = axios.get("http://localhost:3000/users");

    Promise.race([users, backup])
        .then(users => setText(JSON.stringify(users.data)))
        .catch(reason => setText(reason));
}