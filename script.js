const url = 'https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4fb2cb4b05msh06e028da46f0709p1cd5cbjsn043f2f5c9440',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};
const fetchAPI = async () =>{
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

fetchAPI();
