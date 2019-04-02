

const loadTemplate = () => {

    const objects = document.querySelectorAll('[template]');

    objects.forEach(obj => {
        const templateName = obj.getAttribute('template')
        fetch(`/templates/${templateName}.html`)
            .then(function (response) {
                return response.text();
            })
            .then(function (myTemplate) {
                obj.innerHTML = myTemplate
            });
    })



}


window.onload = () => {
    console.log('Hello world');
    loadTemplate()
}


