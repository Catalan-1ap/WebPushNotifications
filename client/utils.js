export function currySetter(setter) {
    return (e) => setter(e.target.value);
}