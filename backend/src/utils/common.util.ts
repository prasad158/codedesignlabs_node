function validateObject(keys_to_check: string[], obj: { [key: string]: any }) {
    const keys = Object.keys(obj);

    for (const k of keys_to_check) {
        if (!keys.includes(k)) {
            return false;
        }
    }
    return true;
}

export {
    validateObject
}
