export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid = value.trim() !== '';
    }

    if (isValid && rules.minLength) {
        isValid = value.length >= rules.minLength;
    }

    if (isValid && rules.maxLength) {
        isValid = value.length <= rules.maxLength;
    }

    return isValid;
}