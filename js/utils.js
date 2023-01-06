function yearsFromDate(date) {
    return (new Date(Date.now() - (new Date(date)))).getUTCFullYear() - 1970
}