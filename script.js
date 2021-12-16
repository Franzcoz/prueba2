
let show1 = $('#main');
let show2 = $('#error');
let dat;
let heroImg
let heroNm

$('#botoncito').on('click', function() {
    let capture = $('#hero').val()
    if (capture >= 1 && capture <= 732) {
        $.get(`https://www.superheroapi.com/api.php/3525635500807579/${capture}`, function(datos) {
            console.log(datos);
            dat = datos;
            heroImg = dat.image.url
            heroNm = dat.name
            heroStats = dat.powerstats
            heroBio = dat.biography
            heroCon = dat.connections
            heroWork = dat.work
            heroAp = dat.appearance
            show1.attr('class', '');
            show2.attr('class', 'd-none');
            $('#image').attr('src', heroImg);
            $('.nombre').html(`Nombre: ${heroNm}`);
            $('.nomdesc').html(`<p>Parientes: ${heroCon.relatives}</p><p>Afiliaciones: ${heroCon.affiliation}</p>`);
            $('#publi').html(`Publicado por: ${heroBio.publisher}`);
            $('#ocup').html(`Ocupaciones: ${heroWork.occupation}`);
            $('#primer').html(`Primera aparición: ${heroBio['first-appearance']}`);
            $('#altu').html(`Altura: ${heroAp.height}`);
            $('#peso').html(`Peso: ${heroAp.weight}`);
            $('#apodos').html(`Apodos: ${heroBio.aliases}`);
            suma = Object.values(heroStats).reduce(function(now, mas) {
                now=parseInt(now)
                mas=parseInt(mas)
                return now + mas})
            var chart = new CanvasJS.Chart("pie", {
                theme: "light2",
                exportEnabled: false,
                animationEnabled: true,
                title: {
                    text: `Estadísticas de Poder de ${heroNm}`
                },
                data: [{
                    type: "pie",
                    startAngle: 270,
                    toolTipContent: "<b>{label}</b>: {y}%",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}%",
                    dataPoints: [
                        { y: Number((heroStats.combat*100/suma).toFixed(2)), label: "Combate" },
                        { y: Number((heroStats.durability*100/suma).toFixed(2)), label: "Durabilidad" },
                        { y: Number((heroStats.intelligence*100/suma).toFixed(2)), label: "Inteligencia" },
                        { y: Number((heroStats.power*100/suma).toFixed(2)), label: "Poder" },
                        { y: Number((heroStats.speed*100/suma).toFixed(2)), label: "Velocidad" },
                        { y: Number((heroStats.strength*100/suma).toFixed(2)), label: "Fuerza" },
                    ]
                }]
            });
            chart.render();
        })
    } else {
        show2.attr('class', '');
        show1.attr('class', 'd-none');
        show2.html(`<div class="container d-block mx-5 my-2"><h1 class="text-danger fst-italic bg-warning">Debe ingresar un número entre 1 y 732</h1></div>`)
    }

})

function Estudiante(nombre, comuna) {
    this.nom = nombre;
    this.com = comuna;
    this.Saludo = function() {
        return `Hola! Soy ${this.nom} y vivo en ${this.com}`;
    }
}

let Franco = new Estudiante('Franco', 'Temuco')