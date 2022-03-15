const date = new Date()

export const deleteExpiredCode = function() {
    const items = { ...localStorage };
    Object.keys(items).forEach(key => {
        if (key.startsWith("problemID: "))
            if(date.getTime() > JSON.parse(items[key]).expiredAt)
                localStorage.removeItem(key);
    });
}