function removeLeadingZero(value) {
    if (!!value && value.startsWith('0') && value.length > 1) {
        return +value;
    }
}