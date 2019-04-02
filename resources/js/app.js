
const renderModel = (model, isUl) => {
    const values = typeof model.value === 'string' ? [model.value] : model.value
    const tag = isUl === undefined ? 'span' : isUl === true ? 'li' : 'span'
    const valuesBoxes = values.map(i => {

        if(typeof i === 'string') {
            return `<${tag}>${i}</${tag}>`
        }

        if(typeof i === 'object') {
            return renderModel(i, model.isUl)
        }
        
    }).join('')
    return valuesBoxes
}


const loadTemplate = async () => {

    const objects = document.querySelectorAll('[template]');

    objects.forEach(obj => {
        const templateName = obj.getAttribute('template')
        const title = obj.getAttribute('title')
        fetch(`/templates/model.html`)
            .then(function (response) {
                return response.text();
            })
            .then(async (myTemplate) => {
                let templateData = `<div class=\"box-title\">${title}</div>`
                const models = await loadModel(templateName)
                
                models.forEach(model => {   
                    let templateItem = myTemplate.split('{{KEY}}').join(model.key)
                    templateItem = templateItem.split('{{VALUE}}').join(renderModel(model))
                    templateData += templateItem
                })  
                
                obj.innerHTML = templateData


            });
    })

}

const loadModel = (modelName) => {
    return fetch(`/models/${modelName}.json`)
            .then(function (response) {
                return response.json();
            })
}

window.onload = () => {
    loadTemplate()
}


