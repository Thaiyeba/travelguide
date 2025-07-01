const btnSearch=document.getElementById('btnSearch');

btnSearch.addEventListener('click',searchdest);
function searchdest(e) {
    e.preventDefault();
    const input = document.getElementById('input').value.trim().toLowerCase();
    const resultdiv = document.getElementById('result');
    resultdiv.innerHTML = '';

    const keywordMap = {
        "beach": "beaches",
        "beaches": "beaches",
        "temple": "temples",
        "temples": "temples"
    };

    const normalized = keywordMap[input] || input;

    if (normalized) {
        fetch('travel_guide_api.json')
            .then(response => response.json())
            .then(data => {
                if (normalized === "beaches" || normalized === "temples") {
                    const items = data[normalized];

                    if (!items.length) {
                        resultdiv.innerHTML = `<p>No results found for '${input}'</p>`;
                        return;
                    }

                    items.forEach(item => {
                        resultdiv.innerHTML += `
                        <div style="background-color: white; border-radius: 10px; padding: 15px; box-shadow: 0 0 10px rgba(0,0,0,0.2); width: 620px;">
                            <img src="${item.imageUrl}" alt="${item.name}" style="height: 400px; width: 100%; object-fit: cover; border-radius: 10px;">
                            <h2 style="color: rgb(1, 45, 92); font-family: Georgia; margin-top: 10px;">${item.name}</h2>
                            <p style="color: #333; font-size: 15px;">${item.description}</p>
                            <button style="margin-top: 10px; padding: 8px 15px; background-color: rgb(1, 45, 92); color: white; border: none; border-radius: 30px;">Visit</button>
                        </div>
                        `;
                    });
                }
                
                else if(normalized){    
                    const country=data.countries.find(item=> item.name.toLowerCase() === normalized);
                    if (country && country.cities){
                        for (let i=0;i<country.cities.length;i++){
                            const city=country.cities[i];
                            resultdiv.innerHTML+=`
                            <div style="background-color:white;border-radius:10px;padding:15px;box-shadow:0 0 10px rgba(0,0,0,0.2);width:620px;">
                            <img src="${city.imageUrl}" alt="${city.name}" style="height:400px;width:100%;object-fit:cover;border-radius:10px;">
                            <h2 style="color: rgb(1, 45, 92); font-family: Georgia; margin-top: 10px;">${city.name}</h2>
                            <p style="color:#333;font-size:15px;">${city.description}</p>
                            <button style="margin-top:10px;padding:8px 15px;background-color:rgb(1,45,92);color:white;border:none;border-radius:30px;">Visit</button>
                            </div>
                            `;
                        }
                    }

                }
                else {
                    resultdiv.innerHTML = `<p style="color:white;">Try 'beach', 'temple', or a valid country name.</p>`;
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                resultdiv.innerHTML = `<p style="color:white;">Error loading results.</p>`;
            });
    } else {
        alert("Invalid keyword. Enter a valid name.");
    }
}
const resetbtn=document.getElementById('resetbtn');
resetbtn.addEventListener('click',clearsearch);
function clearsearch(e){    
    e.preventDefault();
    document.getElementById('input').value="";
}
