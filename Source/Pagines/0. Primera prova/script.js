function changeTab(tabId) {
    // Amaga tots els continguts
    var tabContents = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }

    // Mostra només el contingut de la pestanya clicada
    document.getElementById(tabId).style.display = 'block';
}

//Nits
const labels = ['Grècia', 'França', 'Itàlia', 'Espanya']
const colors = ['rgb(69,177,223)', 'rgb(99,201,122)', 'rgb(203,82,82)', 'rgb(229,224,88)'];

const graph = document.querySelector("#grafica");

const data = {
    labels: labels,
    datasets: [{
        data: [91, 63, 47, 4],
        backgroundColor: colors
    }]
};

const config = {
    type: 'pie',
    data: data,
};

new Chart(graph, config);
