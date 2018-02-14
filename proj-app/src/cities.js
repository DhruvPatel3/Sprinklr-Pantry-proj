const a = ["Huntington Beach","Ahmedabad", "Rust"]

export default function getCities() {
    return new Promise((resolve) => {
        setTimeout(function(){resolve(a)},1000);
    })
}