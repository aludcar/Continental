export const useValidateDuplicates = (source, valueToValidate) =>{
    let valuesFound = 0;

    source?.forEach(element => {
        element.value === valueToValidate && valuesFound++
    });

    return valuesFound > 1;
}