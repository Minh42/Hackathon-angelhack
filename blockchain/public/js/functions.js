function enableSlider() {
    let slider = document.getElementById('slider-container');
    let radio = document.getElementById('flex-charging-radio');
    if (radio.checked) {
        if (slider)
            slider.style.display = 'block';
    }
    else
        if (slider)
            slider.style.display = 'none';
}

function updateSlider(slider) {
    let label = document.getElementById('hours-counter');
    if (label)
        label.innerText = `Hours: ${slider.value}`;
}