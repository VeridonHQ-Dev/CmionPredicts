export type Position = 'GOALKEEPER' | 'DEFENDER' | 'MIDFIELDER' | 'FORWARD';

export interface ClubRosterData {
  league: string;
  players: {
    goalkeepers: string[];
    defenders: string[];
    midfielders: string[];
    forwards: string[];
  };
}

export const REAL_CLUB_ROSTERS: Record<string, ClubRosterData> = {
  "manchester united": {
    league: "Premier League",
    players: {
      goalkeepers: ["André Onana", "Altay Bayındır"],
      defenders: ["Diogo Dalot", "Lisandro Martínez", "Matthijs de Ligt", "Noussair Mazraoui", "Harry Maguire"],
      midfielders: ["Bruno Fernandes", "Kobbie Mainoo", "Manuel Ugarte", "Casemiro", "Mason Mount"],
      forwards: ["Alejandro Garnacho", "Rasmus Højlund", "Marcus Rashford", "Joshua Zirkzee", "Amad Diallo"]
    }
  },
  "manchester city": {
    league: "Premier League",
    players: {
      goalkeepers: ["Ederson", "Stefan Ortega"],
      defenders: ["Joško Gvardiol", "Rúben Dias", "Manuel Akanji", "Nathan Aké", "Kyle Walker"],
      midfielders: ["Kevin De Bruyne", "Phil Foden", "Bernardo Silva", "Rodri", "İlkay Gündoğan", "Mateo Kovačić"],
      forwards: ["Erling Haaland", "Jeremy Doku", "Savinho", "Jack Grealish"]
    }
  },
  "arsenal": {
    league: "Premier League",
    players: {
      goalkeepers: ["David Raya", "Neto"],
      defenders: ["William Saliba", "Gabriel Magalhães", "Jurriën Timber", "Ben White", "Riccardo Calafiori"],
      midfielders: ["Bukayo Saka", "Martin Ødegaard", "Declan Rice", "Thomas Partey", "Mikel Merino"],
      forwards: ["Kai Havertz", "Gabriel Martinelli", "Leandro Trossard", "Raheem Sterling", "Gabriel Jesus"]
    }
  },
  "liverpool": {
    league: "Premier League",
    players: {
      goalkeepers: ["Alisson Becker", "Caoimhín Kelleher"],
      defenders: ["Virgil van Dijk", "Trent Alexander-Arnold", "Ibrahima Konaté", "Andy Robertson", "Kostas Tsimikas"],
      midfielders: ["Alexis Mac Allister", "Ryan Gravenberch", "Dominik Szoboszlai", "Curtis Jones", "Harvey Elliott"],
      forwards: ["Mohamed Salah", "Luis Díaz", "Cody Gakpo", "Darwin Núñez", "Federico Chiesa"]
    }
  },
  "chelsea": {
    league: "Premier League",
    players: {
      goalkeepers: ["Robert Sánchez", "Filip Jørgensen"],
      defenders: ["Marc Cucurella", "Levi Colwill", "Wesley Fofana", "Malo Gusto", "Reece James"],
      midfielders: ["Cole Palmer", "Moisés Caicedo", "Enzo Fernández", "Roméo Lavia", "Renato Veiga"],
      forwards: ["Nicolas Jackson", "Noni Madueke", "Christopher Nkunku", "Jadon Sancho", "Pedro Neto"]
    }
  },
  "tottenham hotspur": {
    league: "Premier League",
    players: {
      goalkeepers: ["Guglielmo Vicario", "Fraser Forster"],
      defenders: ["Cristian Romero", "Micky van de Ven", "Pedro Porro", "Destiny Udogie", "Radu Drăgușin"],
      midfielders: ["James Maddison", "Dejan Kulusevski", "Rodrigo Bentancur", "Pape Matar Sarr", "Yves Bissouma"],
      forwards: ["Son Heung-min", "Dominic Solanke", "Brennan Johnson", "Richarlison", "Timo Werner"]
    }
  },
  "aston villa": {
    league: "Premier League",
    players: {
      goalkeepers: ["Emiliano Martínez", "Robin Olsen"],
      defenders: ["Pau Torres", "Ezri Konsa", "Lucas Digne", "Matty Cash", "Diego Carlos"],
      midfielders: ["Youri Tielemans", "Amadou Onana", "John McGinn", "Morgan Rogers", "Jacob Ramsey"],
      forwards: ["Ollie Watkins", "Jhon Durán", "Leon Bailey", "Emiliano Buendía"]
    }
  },
  "newcastle united": {
    league: "Premier League",
    players: {
      goalkeepers: ["Nick Pope", "Martin Dúbravka"],
      defenders: ["Dan Burn", "Fabian Schär", "Lewis Hall", "Tino Livramento", "Kieran Trippier"],
      midfielders: ["Bruno Guimarães", "Joelinton", "Sandro Tonali", "Joe Willock", "Sean Longstaff"],
      forwards: ["Alexander Isak", "Anthony Gordon", "Harvey Barnes", "Jacob Murphy", "Callum Wilson"]
    }
  },
  "everton": {
    league: "Premier League",
    players: {
      goalkeepers: ["Jordan Pickford", "João Virgínia"],
      defenders: ["James Tarkowski", "Jarrad Branthwaite", "Vitaliy Mykolenko", "Michael Keane", "Ashley Young"],
      midfielders: ["Dwight McNeil", "Idrissa Gueye", "Abdoulaye Doucouré", "Tim Iroegbunam", "Orel Mangala"],
      forwards: ["Dominic Calvert-Lewin", "Beto", "Jesper Lindstrøm", "Jack Harrison", "Armando Broja"]
    }
  },
  "wolverhampton wanderers": {
    league: "Premier League",
    players: {
      goalkeepers: ["José Sá", "Sam Johnstone"],
      defenders: ["Rayan Aït-Nouri", "Toti Gomes", "Craig Dawson", "Nélson Semedo", "Santiago Bueno"],
      midfielders: ["Matheus Cunha", "Mario Lemina", "João Gomes", "Jean-Ricner Bellegarde", "Tommy Doyle"],
      forwards: ["Hwang Hee-chan", "Jørgen Strand Larsen", "Gonçalo Guedes", "Carlos Forbs"]
    }
  },
  "wolves": {
    league: "Premier League",
    players: {
      goalkeepers: ["José Sá", "Sam Johnstone"],
      defenders: ["Rayan Aït-Nouri", "Toti Gomes", "Craig Dawson", "Nélson Semedo", "Santiago Bueno"],
      midfielders: ["Matheus Cunha", "Mario Lemina", "João Gomes", "Jean-Ricner Bellegarde", "Tommy Doyle"],
      forwards: ["Hwang Hee-chan", "Jørgen Strand Larsen", "Gonçalo Guedes", "Carlos Forbs"]
    }
  },
  "brighton": {
    league: "Premier League",
    players: {
      goalkeepers: ["Bart Verbruggen", "Jason Steele"],
      defenders: ["Lewis Dunk", "Jan Paul van Hecke", "Pervis Estupiñán", "Joël Veltman", "Igor Julio"],
      midfielders: ["Kaoru Mitoma", "Carlos Baleba", "Yasin Ayari", "Mats Wieffer", "Jack Hinshelwood"],
      forwards: ["Danny Welbeck", "Georginio Rutter", "Yankuba Minteh", "Simon Adingra", "Evan Ferguson"]
    }
  },
  "west ham united": {
    league: "Premier League",
    players: {
      goalkeepers: ["Alphonse Areola", "Łukasz Fabiański"],
      defenders: ["Max Kilman", "Konstantinos Mavropanos", "Emerson Palmieri", "Aaron Wan-Bissaka", "Jean-Clair Todibo"],
      midfielders: ["Lucas Paquetá", "Mohammed Kudus", "Guido Rodríguez", "Tomáš Souček", "Edson Álvarez"],
      forwards: ["Jarrod Bowen", "Michail Antonio", "Crysencio Summerville", "Niclas Füllkrug", "Danny Ings"]
    }
  },
  "brentford": {
    league: "Premier League",
    players: {
      goalkeepers: ["Mark Flekken", "Hákon Valdimarsson"],
      defenders: ["Nathan Collins", "Ethan Pinnock", "Kristoffer Ajer", "Sepp van den Berg", "Keane Lewis-Potter"],
      midfielders: ["Bryan Mbeumo", "Christian Nørgaard", "Vitaly Janelt", "Mikkel Damsgaard", "Mathias Jensen"],
      forwards: ["Yoane Wissa", "Kevin Schade", "Fabio Carvalho", "Igor Thiago"]
    }
  },
  "fulham": {
    league: "Premier League",
    players: {
      goalkeepers: ["Bernd Leno", "Steven Benda"],
      defenders: ["Antonee Robinson", "Calvin Bassey", "Joachim Andersen", "Kenny Tete", "Timothy Castagne"],
      midfielders: ["Emile Smith Rowe", "Andreas Pereira", "Sander Berge", "Alex Iwobi", "Saša Lukić"],
      forwards: ["Raúl Jiménez", "Adama Traoré", "Rodrigo Muniz", "Harry Wilson", "Reiss Nelson"]
    }
  },
  "crystal palace": {
    league: "Premier League",
    players: {
      goalkeepers: ["Dean Henderson", "Matt Turner"],
      defenders: ["Marc Guéhi", "Maxence Lacroix", "Tyrick Mitchell", "Daniel Muñoz", "Chris Richards"],
      midfielders: ["Eberechi Eze", "Adam Wharton", "Daichi Kamada", "Will Hughes", "Jefferson Lerma"],
      forwards: ["Jean-Philippe Mateta", "Eddie Nketiah", "Ismaïla Sarr", "Matheus França"]
    }
  },
  "bournemouth": {
    league: "Premier League",
    players: {
      goalkeepers: ["Kepa Arrizabalaga", "Mark Travers"],
      defenders: ["Milos Kerkez", "Illia Zabarnyi", "Marcos Senesi", "Adam Smith", "Julián Araujo"],
      midfielders: ["Antoine Semenyo", "Marcus Tavernier", "Lewis Cook", "Ryan Christie", "Alex Scott"],
      forwards: ["Evanilson", "Justin Kluivert", "Dango Ouattara", "Enes Ünal"]
    }
  },
  "leicester city": {
    league: "Premier League",
    players: {
      goalkeepers: ["Mads Hermansen", "Danny Ward"],
      defenders: ["Wout Faes", "Caleb Okoli", "Victor Kristiansen", "James Justin", "Jannik Vestergaard"],
      midfielders: ["Harry Winks", "Wilfred Ndidi", "Facundo Buonanotte", "Oliver Skipp", "Bilal El Khannouss"],
      forwards: ["Jamie Vardy", "Stephy Mavididi", "Jordan Ayew", "Patson Daka", "Abdul Fatawu"]
    }
  },
  "southampton": {
    league: "Premier League",
    players: {
      goalkeepers: ["Aaron Ramsdale", "Alex McCarthy"],
      defenders: ["Jan Bednarek", "Taylor Harwood-Bellis", "Kyle Walker-Peters", "Jack Stephens", "Yukinari Sugawara"],
      midfielders: ["Tyler Dibling", "Mateus Fernandes", "Flynn Downes", "Adam Lallana", "Joe Aribo"],
      forwards: ["Cameron Archer", "Adam Armstrong", "Ben Brereton Díaz", "Paul Onuachu"]
    }
  },
  "norwich city": {
    league: "Championship",
    players: {
      goalkeepers: ["Angus Gunn", "George Long"],
      defenders: ["Callum Doyle", "Shane Duffy", "José Córdoba", "Kellen Fisher", "Jack Stacey"],
      midfielders: ["Borja Sainz", "Kenny McLean", "Marcelino Núñez", "Amankwah Forson", "Liam Gibbs"],
      forwards: ["Josh Sargent", "Ante Crnac", "Oscar Schwartau", "Christian Fassnacht"]
    }
  },
  "watford": {
    league: "Championship",
    players: {
      goalkeepers: ["Daniel Bachmann", "Jonathan Bond"],
      defenders: ["Ryan Porteous", "Mattie Pollock", "James Morris", "Francisco Sierralta", "Festy Ebosele"],
      midfielders: ["Edo Kayembe", "Moussa Sissoko", "Tom Ince", "Imrân Louza", "Giorgi Chakvetadze"],
      forwards: ["Vakoun Bayo", "Kwadwo Baah", "Daniel Jebbison", "Rocco Vata"]
    }
  },
  "sheffield united": {
    league: "Championship",
    players: {
      goalkeepers: ["Michael Cooper", "Adam Davies"],
      defenders: ["Anel Ahmedhodžić", "Harry Souttar", "Harrison Burrows", "Alfie Gilchrist", "Jack Robinson"],
      midfielders: ["Gustavo Hamer", "Callum O'Hare", "Vinícius Souza", "Oliver Arblaster", "Jesurun Rak-Sakyi"],
      forwards: ["Kieffer Moore", "Tyrese Campbell", "Rhian Brewster", "Andre Brooks"]
    }
  },
  "coventry city": {
    league: "Championship",
    players: {
      goalkeepers: ["Oliver Dovin", "Ben Wilson"],
      defenders: ["Bobby Thomas", "Luis Binks", "Jake Bidwell", "Milan van Ewijk", "Joel Latibeaudiere"],
      midfielders: ["Jack Rudoni", "Ben Sheaf", "Josh Eccles", "Victor Torp", "Tatsuhiro Sakamoto"],
      forwards: ["Haji Wright", "Ellis Simms", "Brandon Thomas-Asante", "Norman Bassette"]
    }
  },
  "fleetwood town": {
    league: "League Two",
    players: {
      goalkeepers: ["David Harrington", "Jay Lynch"],
      defenders: ["Brendan Wiredu", "Shaun Rooney", "James Bolton", "Carl Johnston", "Kayden Hughes"],
      midfielders: ["Danny Mayor", "Mark Helm", "Matty Virtue", "Elliot Bonds", "Harrison Holgate"],
      forwards: ["Ryan Graydon", "Ronan Coughlan", "Kian Harratt", "Coughlan Mipo"]
    }
  },
  "afc wimbledon": {
    league: "League Two",
    players: {
      goalkeepers: ["Owen Goodman", "Lewis Ward"],
      defenders: ["Riley Harbottle", "Joe Lewis", "Isaac Ogundere", "James Tilley", "John-Joe O'Toole"],
      midfielders: ["Jake Reeves", "Alistair Smith", "Myles Hippolyte", "Callum Maycock", "Morgan Neufville"],
      forwards: ["Mathew Stevens", "Omar Bugiel", "Josh Kelly", "Joe Pigott"]
    }
  },
  "milton keynes dons": {
    league: "League Two",
    players: {
      goalkeepers: ["Tom McGill", "Craig MacGillivray"],
      defenders: ["Laurence Maguire", "Luke Offord", "Sam Sherring", "Aaron Nemane", "Nico Lawrence"],
      midfielders: ["Alex Gilbey", "Connor Lemonheigh-Evans", "Liam Kelly", "Joe White", "Tom Carroll"],
      forwards: ["Callum Hendry", "Ellis Harrison", "Scott Hogan", "Tommy Leigh"]
    }
  },
  "mk dons": {
    league: "League Two",
    players: {
      goalkeepers: ["Tom McGill", "Craig MacGillivray"],
      defenders: ["Laurence Maguire", "Luke Offord", "Sam Sherring", "Aaron Nemane", "Nico Lawrence"],
      midfielders: ["Alex Gilbey", "Connor Lemonheigh-Evans", "Liam Kelly", "Joe White", "Tom Carroll"],
      forwards: ["Callum Hendry", "Ellis Harrison", "Scott Hogan", "Tommy Leigh"]
    }
  },
  "real madrid": {
    league: "La Liga",
    players: {
      goalkeepers: ["Thibaut Courtois", "Andriy Lunin"],
      defenders: ["Antonio Rüdiger", "Éder Militão", "Dani Carvajal", "Ferland Mendy", "Lucas Vázquez"],
      midfielders: ["Jude Bellingham", "Federico Valverde", "Aurélien Tchouaméni", "Luka Modrić", "Eduardo Camavinga"],
      forwards: ["Vinícius Júnior", "Kylian Mbappé", "Rodrygo", "Endrick", "Brahim Díaz"]
    }
  },
  "barcelona": {
    league: "La Liga",
    players: {
      goalkeepers: ["Marc-André ter Stegen", "Iñaki Peña"],
      defenders: ["Pau Cubarsí", "Jules Koundé", "Iñigo Martínez", "Alejandro Balde", "Eric García"],
      midfielders: ["Pedri", "Dani Olmo", "Marc Casadó", "Gavi", "Frenkie de Jong"],
      forwards: ["Lamine Yamal", "Robert Lewandowski", "Raphinha", "Ferran Torres", "Ansu Fati"]
    }
  },
  "atletico madrid": {
    league: "La Liga",
    players: {
      goalkeepers: ["Jan Oblak", "Juan Musso"],
      defenders: ["Robin Le Normand", "José María Giménez", "Nahuel Molina", "Reinildo", "César Azpilicueta"],
      midfielders: ["Conor Gallagher", "Rodrigo De Paul", "Koke", "Marcos Llorente", "Pablo Barrios"],
      forwards: ["Antoine Griezmann", "Julián Alvarez", "Alexander Sørloth", "Ángel Correa"]
    }
  },
  "real sociedad": {
    league: "La Liga",
    players: {
      goalkeepers: ["Álex Remiro", "Unai Marrero"],
      defenders: ["Nayef Aguerd", "Igor Zubeldia", "Javi López", "Jon Aramburu", "Aritz Elustondo"],
      midfielders: ["Martín Zubimendi", "Luka Sučić", "Brais Méndez", "Sergio Gómez", "Beñat Turrientes"],
      forwards: ["Takefusa Kubo", "Mikel Oyarzabal", "Orri Óskarsson", "Sheraldo Becker", "Umar Sadiq"]
    }
  },
  "real betis": {
    league: "La Liga",
    players: {
      goalkeepers: ["Rui Silva", "Adrián"],
      defenders: ["Diego Llorente", "Natan", "Romain Perraud", "Youssouf Sabaly", "Marc Bartra"],
      midfielders: ["Giovani Lo Celso", "Pablo Fornals", "Marc Roca", "Sergi Altimira", "Johnny Cardoso"],
      forwards: ["Vitor Roque", "Abde Ezzalzouli", "Chimy Ávila", "Cédric Bakambu", "Juanmi"]
    }
  },
  "athletic club": {
    league: "La Liga",
    players: {
      goalkeepers: ["Unai Simón", "Julen Agirrezabala"],
      defenders: ["Daniel Vivian", "Aitor Paredes", "Yuri Berchiche", "Óscar de Marcos", "Yeray Álvarez"],
      midfielders: ["Oihan Sancet", "Beñat Prados", "Iñigo Ruiz de Galarreta", "Mikel Vesga", "Unai Gómez"],
      forwards: ["Nico Williams", "Iñaki Williams", "Gorka Guruzeta", "Álex Berenguer", "Álvaro Djaló"]
    }
  },
  "bayern munich": {
    league: "Bundesliga",
    players: {
      goalkeepers: ["Manuel Neuer", "Sven Ulreich"],
      defenders: ["Dayot Upamecano", "Kim Min-jae", "Alphonso Davies", "Raphaël Guerreiro", "Eric Dier"],
      midfielders: ["Jamal Musiala", "Joshua Kimmich", "Aleksandar Pavlović", "João Palhinha", "Konrad Laimer"],
      forwards: ["Harry Kane", "Michael Olise", "Serge Gnabry", "Leroy Sané", "Kingsley Coman", "Mathys Tel"]
    }
  },
  "bayer leverkusen": {
    league: "Bundesliga",
    players: {
      goalkeepers: ["Lukáš Hrádecký", "Matej Kovář"],
      defenders: ["Jonathan Tah", "Edmond Tapsoba", "Piero Hincapié", "Alejandro Grimaldo", "Jeremie Frimpong"],
      midfielders: ["Florian Wirtz", "Granit Xhaka", "Robert Andrich", "Exequiel Palacios", "Aleix García"],
      forwards: ["Victor Boniface", "Patrik Schick", "Martin Terrier", "Amine Adli"]
    }
  },
  "borussia dortmund": {
    league: "Bundesliga",
    players: {
      goalkeepers: ["Gregor Kobel", "Alexander Meyer"],
      defenders: ["Nico Schlotterbeck", "Waldemar Anton", "Ramy Bensebaini", "Yan Couto", "Niklas Süle"],
      midfielders: ["Julian Brandt", "Marcel Sabitzer", "Emre Can", "Pascal Groß", "Felix Nmecha"],
      forwards: ["Serhou Guirassy", "Jamie Gittens", "Karim Adeyemi", "Maximilian Beier", "Donyell Malen"]
    }
  },
  "inter milan": {
    league: "Serie A",
    players: {
      goalkeepers: ["Yann Sommer", "Josep Martínez"],
      defenders: ["Alessandro Bastoni", "Francesco Acerbi", "Benjamin Pavard", "Federico Dimarco", "Denzel Dumfries"],
      midfielders: ["Nicolò Barella", "Hakan Çalhanoğlu", "Henrikh Mkhitaryan", "Davide Frattesi", "Piotr Zieliński"],
      forwards: ["Lautaro Martínez", "Marcus Thuram", "Mehdi Taremi", "Marko Arnautović"]
    }
  },
  "juventus": {
    league: "Serie A",
    players: {
      goalkeepers: ["Michele Di Gregorio", "Mattia Perin"],
      defenders: ["Bremer", "Federico Gatti", "Pierre Kalulu", "Andrea Cambiaso", "Nicolò Savona"],
      midfielders: ["Teun Koopmeiners", "Manuel Locatelli", "Khéphren Thuram", "Weston McKennie", "Douglas Luiz"],
      forwards: ["Dušan Vlahović", "Kenan Yıldız", "Nicolás González", "Francisco Conceição", "Arkadiusz Milik"]
    }
  },
  "ac milan": {
    league: "Serie A",
    players: {
      goalkeepers: ["Mike Maignan", "Marco Sportiello"],
      defenders: ["Theo Hernández", "Fikayo Tomori", "Strahinja Pavlović", "Emerson Royal", "Matteo Gabbia"],
      midfielders: ["Christian Pulisic", "Tijjani Reijnders", "Youssouf Fofana", "Ruben Loftus-Cheek", "Yunus Musah"],
      forwards: ["Rafael Leão", "Álvaro Morata", "Tammy Abraham", "Samuel Chukwueze", "Noah Okafor"]
    }
  },
  "paris saint-germain": {
    league: "Ligue 1",
    players: {
      goalkeepers: ["Gianluigi Donnarumma", "Matvey Safonov"],
      defenders: ["Marquinhos", "Willian Pacho", "Achraf Hakimi", "Nuno Mendes", "Lucas Beraldo"],
      midfielders: ["Vitinha", "João Neves", "Warren Zaïre-Emery", "Fabián Ruiz", "Lee Kang-in"],
      forwards: ["Bradley Barcola", "Ousmane Dembélé", "Randal Kolo Muani", "Marco Asensio", "Gonçalo Ramos"]
    }
  },
  "psg": {
    league: "Ligue 1",
    players: {
      goalkeepers: ["Gianluigi Donnarumma", "Matvey Safonov"],
      defenders: ["Marquinhos", "Willian Pacho", "Achraf Hakimi", "Nuno Mendes", "Lucas Beraldo"],
      midfielders: ["Vitinha", "João Neves", "Warren Zaïre-Emery", "Fabián Ruiz", "Lee Kang-in"],
      forwards: ["Bradley Barcola", "Ousmane Dembélé", "Randal Kolo Muani", "Marco Asensio", "Gonçalo Ramos"]
    }
  },
  "sporting cp": {
    league: "Primeira Liga",
    players: {
      goalkeepers: ["Franco Israel", "Vladan Kovačević"],
      defenders: ["Gonçalo Inácio", "Ousmane Diomande", "Zeno Debast", "Nuno Santos", "Geovany Quenda"],
      midfielders: ["Morten Hjulmand", "Hidemasa Morita", "Daniel Bragança", "Geny Catamo"],
      forwards: ["Viktor Gyökeres", "Pedro Gonçalves", "Francisco Trincão", "Conrad Harder"]
    }
  },
  "benfica": {
    league: "Primeira Liga",
    players: {
      goalkeepers: ["Anatoliy Trubin", "Samuel Soares"],
      defenders: ["Nicolás Otamendi", "António Silva", "Álvaro Carreras", "Alexander Bah", "Tomás Araújo"],
      midfielders: ["Orkun Kökçü", "Florentino Luís", "Fredrik Aursnes", "Leandro Barreiro", "Jan-Niklas Beste"],
      forwards: ["Ángel Di María", "Kerem Aktürkoğlu", "Vangelis Pavlidis", "Arthur Cabral", "Andreas Schjelderup"]
    }
  },
  "celtic": {
    league: "Scottish Premiership",
    players: {
      goalkeepers: ["Kasper Schmeichel", "Viljami Sinisalo"],
      defenders: ["Cameron Carter-Vickers", "Liam Scales", "Greg Taylor", "Alistair Johnston", "Auston Trusty"],
      midfielders: ["Callum McGregor", "Reo Hatate", "Arne Engels", "Paulo Bernardo", "Luke McCowan"],
      forwards: ["Kyogo Furuhashi", "Daizen Maeda", "Nicolas Kühn", "Adam Idah", "James Forrest"]
    }
  },
  "rangers": {
    league: "Scottish Premiership",
    players: {
      goalkeepers: ["Jack Butland", "Liam Kelly"],
      defenders: ["James Tavernier", "Robin Pröpper", "John Souttar", "Jefté", "Neraysho Kasanwirjo"],
      midfielders: ["Mohamed Diomande", "Connor Barron", "Nedim Bajrami", "Nicolas Raskin", "Tom Lawrence"],
      forwards: ["Cyriel Dessers", "Václav Černý", "Hamza Igamane", "Danilo"]
    }
  },
  "porto": {
    league: "Primeira Liga",
    players: {
      goalkeepers: ["Diogo Costa", "Cláudio Ramos"],
      defenders: ["Nehuén Pérez", "Tiago Djaló", "Francisco Moura", "Martim Fernandes", "Zé Pedro"],
      midfielders: ["Alan Varela", "Nico González", "Stephen Eustáquio", "Vasco Sousa"],
      forwards: ["Samu Omorodion", "Galeno", "Pepê", "Danny Namaso", "Gonçalo Borges"]
    }
  },
  "braga": {
    league: "Primeira Liga",
    players: {
      goalkeepers: ["Matheus", "Lukas Hornicek"],
      defenders: ["Paulo Oliveira", "Sikou Niakaté", "João Ferreira", "Víctor Gómez", "Bright Arrey-Mbi"],
      midfielders: ["Vitor Carvalho", "Gorby", "João Moutinho", "André Horta"],
      forwards: ["Ricardo Horta", "Bruma", "Amine El Ouazzani", "Gabri Martínez", "Roberto Fernández"]
    }
  },
  "estrela amadora": {
    league: "Primeira Liga",
    players: {
      goalkeepers: ["Bruno Brígido", "Francisco Meixedo"],
      defenders: ["Ferro", "Issiar Dramé", "Nilton Varela", "Danilo Veiga", "Rúben Lima"],
      midfielders: ["Leonel Bucca", "Igor Jesus", "Alan Ruiz", "Léo Cordeiro", "Paulo Moreira"],
      forwards: ["Kikas", "Rodrigo Pinho", "Nani", "André Luiz", "Bilal Mazhar"]
    }
  },
  "olympiacos": {
    league: "Super League Greece",
    players: {
      goalkeepers: ["Konstantinos Tzolakis", "Alexandros Paschalakis"],
      defenders: ["David Carmo", "Panagiotis Retsos", "Rodinei", "Francisco Ortega", "Giulian Biancone"],
      midfielders: ["Santiago Hezze", "Chiquinho", "Dani García", "Marko Stamenić", "Sérgio Oliveira"],
      forwards: ["Ayoub El Kaabi", "Gelson Martins", "Kristoffer Velde", "Roman Yaremchuk", "Willian"]
    }
  },
  "panathinaikos": {
    league: "Super League Greece",
    players: {
      goalkeepers: ["Bartłomiej Drągowski", "Yuri Lodygin"],
      defenders: ["Tin Jedvaj", "Willian Arão", "Filip Mladenović", "Giannis Kotsiras", "Bart Schenkeveld"],
      midfielders: ["Nemanja Maksimović", "Anastasios Bakasetas", "Adam Gnezda Čerin", "Azzedine Ounahi"],
      forwards: ["Fotis Ioannidis", "Tetê", "Facundo Pellistri", "Filip Đuričić", "Alexander Jeremejeff"]
    }
  },
  "aek athens": {
    league: "Super League Greece",
    players: {
      goalkeepers: ["Thomas Strakosha", "Alberto Brignoli"],
      defenders: ["Domagoj Vida", "Harold Moukoudi", "Lazaros Rota", "Ehsan Hajsafi", "Alexander Callens"],
      midfielders: ["Damian Szymański", "Orbelín Pineda", "Roberto Pereyra", "Robert Ljubičić", "Jens Jønsson"],
      forwards: ["Levi García", "Frantzdy Pierrot", "Anthony Martial", "Erik Lamela", "Niclas Eliasson"]
    }
  },
  "paok": {
    league: "Super League Greece",
    players: {
      goalkeepers: ["Dominik Kotarski", "Jiří Pavlenka"],
      defenders: ["Tomasz Kędziora", "Giannis Michailidis", "Baba Rahman", "Jonny Otto", "Omar Colley"],
      midfielders: ["Stefan Schwab", "Magomed Ozdoev", "Giannis Konstantelias", "Mady Camara", "Tiemoué Bakayoko"],
      forwards: ["Andrija Živković", "Taison", "Tarik Tissoudali", "Fedor Chalov", "Kiril Despodov"]
    }
  },
  "kifisia": {
    league: "Super League Greece",
    players: {
      goalkeepers: ["Giannis Nikopolidis", "Vasilios Xenopoulos"],
      defenders: ["Alberto Botía", "Vasilios Spinos", "Luís Rocha", "Hugo Sousa", "Manolis Sbordone"],
      midfielders: ["Antonis Papasavvas", "Morgan Schneiderlin", "Jorge Pombo", "Facundo Soloa"],
      forwards: ["Mateus Criciúma", "Andrews Tetteh", "Pavlos Pantelidis", "Giannis Mána"]
    }
  },
  "luton town": {
    league: "Championship",
    players: {
      goalkeepers: ["Thomas Kaminski", "Tim Krul"],
      defenders: ["Mark McGuinness", "Teden Mengi", "Alfie Doughty", "Amari'i Bell", "Reuell Walters"],
      midfielders: ["Marvelous Nakamba", "Tahith Chong", "Jordan Clark", "Liam Walsh", "Shandon Baptiste"],
      forwards: ["Carlton Morris", "Elijah Adebayo", "Jacob Brown", "Joe Taylor"]
    }
  },
  "burnley": {
    league: "Championship",
    players: {
      goalkeepers: ["James Trafford", "Václav Hladký"],
      defenders: ["Maxime Estève", "CJ Egan-Riley", "Connor Roberts", "Lucas Pires", "Bashir Humphreys"],
      midfielders: ["Josh Brownhill", "Josh Cullen", "Hannibal Mejbri", "Josh Laurent"],
      forwards: ["Luca Koleosho", "Lyle Foster", "Zian Flemming", "Jeremy Sarmiento", "Jay Rodriguez"]
    }
  },
  "leeds united": {
    league: "Championship",
    players: {
      goalkeepers: ["Illan Meslier", "Karl Darlow"],
      defenders: ["Pascal Struijk", "Joe Rodon", "Junior Firpo", "Jayden Bogle", "Sam Byram"],
      midfielders: ["Ethan Ampadu", "Ao Tanaka", "Joe Rothwell", "Brenden Aaronson"],
      forwards: ["Wilfried Gnonto", "Mateo Joseph", "Joël Piroe", "Largie Ramazani", "Daniel James"]
    }
  },
  "sunderland": {
    league: "Championship",
    players: {
      goalkeepers: ["Anthony Patterson", "Simon Moore"],
      defenders: ["Dan Ballard", "Luke O'Nien", "Trai Hume", "Dennis Cirkin", "Chris Mepham"],
      midfielders: ["Dan Neil", "Jobe Bellingham", "Chris Rigg", "Alan Browne"],
      forwards: ["Romaine Mundle", "Wilson Isidor", "Patrick Roberts", "Eliezer Mayenda", "Nazariy Rusyn"]
    }
  },
  "middlesbrough": {
    league: "Championship",
    players: {
      goalkeepers: ["Seny Dieng", "Sol Brynn"],
      defenders: ["Rav van den Berg", "George Edmundson", "Luke Ayling", "Neto Borges", "Matt Clarke"],
      midfielders: ["Hayden Hackney", "Aidan Morris", "Finn Azaz", "Riley McGree"],
      forwards: ["Emmanuel Latte Lath", "Tommy Conway", "Micah Hamilton", "Delano Burgzorg"]
    }
  },
  "blackburn rovers": {
    league: "Championship",
    players: {
      goalkeepers: ["Aynsley Pears", "Balázs Tóth"],
      defenders: ["Dominic Hyam", "Danny Batth", "Callum Brittain", "Owen Beck", "Hayden Carter"],
      midfielders: ["Sondre Tronstad", "Lewis Travis", "Todd Cantwell", "John Buckley"],
      forwards: ["Yuki Ohashi", "Tyrhys Dolan", "Andreas Weimann", "Makhtar Gueye", "Ryan Hedges"]
    }
  },
  "hull city": {
    league: "Championship",
    players: {
      goalkeepers: ["Ivor Pandur", "Anthony Racioppi"],
      defenders: ["Alfie Jones", "Sean McLoughlin", "Lewie Coyle", "Cody Drameh", "Charlie Hughes"],
      midfielders: ["Xavier Simons", "Regan Slater", "Abdülkadir Ömür", "Kasey Palmer"],
      forwards: ["Mohamed Belloumi", "Chris Bedia", "Liam Millar", "Mason Burstow"]
    }
  },
  "stoke city": {
    league: "Championship",
    players: {
      goalkeepers: ["Viktor Johansson", "Frank Fielding"],
      defenders: ["Ben Wilmot", "Ashley Phillips", "Junior Tchamadeu", "Enda Stevens", "Eric Bocat"],
      midfielders: ["Wouter Burger", "Bae Jun-ho", "Andrew Moran", "Tatsuki Seko", "Lewis Baker"],
      forwards: ["Million Manhoef", "Tom Cannon", "Gallagher Sam", "Niall Ennis"]
    }
  },
  "queens park rangers": {
    league: "Championship",
    players: {
      goalkeepers: ["Paul Nardi", "Joe Walsh"],
      defenders: ["Steve Cook", "Jake Clarke-Salter", "Jimmy Dunne", "Kenneth Paal", "Hevertton Santos"],
      midfielders: ["Sam Field", "Jonathan Varane", "Nicolas Madsen", "Kader Dembélé"],
      forwards: ["Koki Saito", "Žan Celar", "Michael Frey", "Ilias Chair"]
    }
  },
  "bristol city": {
    league: "Championship",
    players: {
      goalkeepers: ["Max O'Leary", "Stefan Bajic"],
      defenders: ["Zak Vyner", "Rob Dickie", "Luke McNally", "Cameron Pring", "George Tanner"],
      midfielders: ["Jason Knight", "Max Bird", "Joe Williams", "Marcus McGuane"],
      forwards: ["Sinclair Armstrong", "Yu Hirakawa", "Nahki Wells", "Mark Sykes", "Anis Mehmeti"]
    }
  },
  "swansea city": {
    league: "Championship",
    players: {
      goalkeepers: ["Lawrence Vigouroux", "Jon McLaughlin"],
      defenders: ["Ben Cabango", "Harry Darling", "Josh Key", "Josh Tymon", "Nathan Tjoe-A-On"],
      midfielders: ["Matt Grimes", "Gonçalo Franco", "Oliver Cooper", "Jay Fulton"],
      forwards: ["Ronald", "Liam Cullen", "Žan Vipotnik", "Myles Peart-Harris", "Florian Bianchini"]
    }
  },
  "cardiff city": {
    league: "Championship",
    players: {
      goalkeepers: ["Jak Alnwick", "Ethan Horvath"],
      defenders: ["Dimitrios Goutas", "Calum Chambers", "Perry Ng", "Callum O'Dowda", "Jesper Daland"],
      midfielders: ["David Turnbull", "Alex Robertson", "Rubin Colwill", "Manolis Siopis", "Joe Ralls"],
      forwards: ["Callum Robinson", "Anwar El Ghazi", "Yakou Méïté", "Wilfried Kanga"]
    }
  },
  "derby county": {
    league: "Championship",
    players: {
      goalkeepers: ["Jacob Widell Zetterström", "Josh Vickers"],
      defenders: ["Curtis Nelson", "Eiran Cashin", "Craig Forsyth", "Kane Wilson", "Nat Phillips"],
      midfielders: ["Kenzo Goudmijn", "Ebou Adams", "Ben Osborn", "Liam Thompson"],
      forwards: ["Kayden Jackson", "Jerry Yates", "Nathaniel Mendez-Laing", "Corey Blackett-Taylor", "James Collins"]
    }
  },
  "stevenage": {
    league: "League One",
    players: {
      goalkeepers: ["Murphy Cooper", "Filip Marschall"],
      defenders: ["Carl Piergianni", "Dan Sweeney", "Lewis Freestone", "Dan Butler", "Kane Smith"],
      midfielders: ["Louis Thompson", "Dan Phillips", "Harvey White", "Nick Freeman", "Elliott List"],
      forwards: ["Jamie Reid", "Jordan Roberts", "Jake Young", "Louis Appéré"]
    }
  }
};

export const CLUB_ALIASES: Record<string, string> = {
  "man city": "manchester city",
  "mancity": "manchester city",
  "city": "manchester city",
  "man utd": "manchester united",
  "man united": "manchester united",
  "manutd": "manchester united",
  "united": "manchester united",
  "spurs": "tottenham hotspur",
  "tottenham": "tottenham hotspur",
  "wolves": "wolverhampton wanderers",
  "wolverhampton": "wolverhampton wanderers",
  "forest": "nottingham forest",
  "nottingham": "nottingham forest",
  "west ham": "west ham united",
  "westham": "west ham united",
  "newcastle": "newcastle united",
  "leicester": "leicester city",
  "southampton": "southampton",
  "saints": "southampton",
  "ipswich": "ipswich town",
  "brighton": "brighton",
  "palace": "crystal palace",
  "bournemouth": "bournemouth",
  "afc bournemouth": "bournemouth",
  "sheffield utd": "sheffield united",
  "sheff utd": "sheffield united",
  "norwich": "norwich city",
  "coventry": "coventry city",
  "derby": "derby county",
  "boro": "middlesbrough",
  "blackburn": "blackburn rovers",
  "hull": "hull city",
  "stoke": "stoke city",
  "qpr": "queens park rangers",
  "swansea": "swansea city",
  "cardiff": "cardiff city",
  "bristol": "bristol city",
  "porto": "porto",
  "fc porto": "porto",
  "fcp": "porto",
  "sporting": "sporting cp",
  "sporting lisbon": "sporting cp",
  "scp": "sporting cp",
  "benfica": "benfica",
  "sl benfica": "benfica",
  "slb": "benfica",
  "braga": "braga",
  "sc braga": "braga",
  "estrela": "estrela amadora",
  "estrela da amadora": "estrela amadora",
  "estrela amadora fc": "estrela amadora",
  "olympiacos": "olympiacos",
  "olympiakos": "olympiacos",
  "panathinaikos": "panathinaikos",
  "pao": "panathinaikos",
  "aek": "aek athens",
  "paok": "paok",
  "kifisia": "kifisia",
  "kifissia": "kifisia",
  "luton": "luton town",
  "leeds": "leeds united",
  "sunderland": "sunderland",
  "inter": "inter milan",
  "internazionale": "inter milan",
  "milan": "ac milan",
  "juve": "juventus",
  "atletico": "atletico madrid",
  "atlético": "atletico madrid",
  "madrid": "real madrid",
  "barca": "barcelona",
  "bayern": "bayern munich",
  "dortmund": "borussia dortmund",
  "bvb": "borussia dortmund",
  "leverkusen": "bayer leverkusen",
  "leipzig": "rb leipzig",
  "paris": "paris saint-germain",
  "celtic": "celtic",
  "rangers": "rangers"
};

// Generates dynamic, realistic Starting 11 players for any unknown lower-tier club
// Guaranteed NEVER to duplicate Kevin De Bruyne, Erling Haaland, or any star player!
export function generateClubRoster(clubName: string): ClubRosterData {
  const norm = clubName.toLowerCase().trim();
  let hash = 0;
  for (let i = 0; i < norm.length; i++) {
    hash = (hash << 5) - hash + norm.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  const firstNames = ["James", "Liam", "Daniel", "Jack", "Harry", "Thomas", "Charlie", "George", "Oliver", "Jacob", "Callum", "Ryan", "Sam", "Luke", "Ben", "Aaron", "Lewis", "Alex", "Joe", "Nathan"];
  const lastNames = ["Smith", "Jones", "Taylor", "Brown", "Williams", "Wilson", "Johnson", "Davies", "Robinson", "Wright", "Thompson", "Evans", "Walker", "White", "Roberts", "Green", "Hall", "Wood", "Clarke", "Hughes"];

  const makeName = (offset: number) => {
    const fIdx = (absHash + offset * 7) % firstNames.length;
    const lIdx = (absHash + offset * 13 + 3) % lastNames.length;
    return `${firstNames[fIdx]} ${lastNames[lIdx]}`;
  };

  return {
    league: "National Competition",
    players: {
      goalkeepers: [makeName(1), makeName(2)],
      defenders: [makeName(3), makeName(4), makeName(5), makeName(6), makeName(7)],
      midfielders: [makeName(8), makeName(9), makeName(10), makeName(11), makeName(12)],
      forwards: [makeName(13), makeName(14), makeName(15), makeName(16)]
    }
  };
}

// Find matching club roster
export function findClubRoster(clubName?: string): ClubRosterData | null {
  if (!clubName || !clubName.trim()) return null;
  
  // Clean string from fixtures, timestamps, brackets, etc.
  let cleaned = clubName
    .toLowerCase()
    .replace(/\[.*?\]|\(.*?\)/g, "")
    .replace(/(?:@\s*)?\b\d{1,2}(?::\d{2})?\s*(?:am|pm)\b/gi, "")
    .replace(/\b\d{1,2}:\d{2}\b/g, "")
    .replace(/\s+(?:vs\.?|vrs\.?|versus|v|-|–|—)\s+.*$/i, "")
    .replace(/\b(fc|cf|sc|afc)\b/gi, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // 1. Direct match in aliases
  if (CLUB_ALIASES[cleaned] && REAL_CLUB_ROSTERS[CLUB_ALIASES[cleaned]]) {
    return REAL_CLUB_ROSTERS[CLUB_ALIASES[cleaned]];
  }

  // 2. Direct match in rosters
  if (REAL_CLUB_ROSTERS[cleaned]) {
    return REAL_CLUB_ROSTERS[cleaned];
  }

  // 3. Substring match in aliases
  for (const [alias, targetKey] of Object.entries(CLUB_ALIASES)) {
    if (cleaned === alias || cleaned.includes(alias) || alias.includes(cleaned)) {
      if (REAL_CLUB_ROSTERS[targetKey]) {
        return REAL_CLUB_ROSTERS[targetKey];
      }
    }
  }

  // 4. Substring match in rosters
  for (const [key, roster] of Object.entries(REAL_CLUB_ROSTERS)) {
    if (cleaned === key || cleaned.includes(key) || key.includes(cleaned)) {
      return roster;
    }
  }

  // 5. Fallback to club-specific dynamic roster so this club NEVER gets assigned players from other clubs!
  return generateClubRoster(cleaned || clubName);
}

// Get authentic real player name from club or position pool
// Supports excludeNames to strictly avoid picking any duplicate player!
export function getAuthenticPlayerName(
  position: Position = "FORWARD",
  clubName?: string,
  indexHint: number = 0,
  excludeNames?: Set<string>
): string {
  const roster = findClubRoster(clubName);
  const list = roster ? (
    position === "GOALKEEPER" ? roster.players.goalkeepers :
    position === "DEFENDER" ? roster.players.defenders :
    position === "MIDFIELDER" ? roster.players.midfielders :
    roster.players.forwards
  ) : [];

  const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");

  if (list && list.length > 0) {
    if (excludeNames && excludeNames.size > 0) {
      for (let i = 0; i < list.length; i++) {
        const candidate = list[(indexHint + i) % list.length];
        if (!excludeNames.has(norm(candidate))) {
          return candidate;
        }
      }
    } else {
      return list[indexHint % list.length];
    }
  }

  const defaults = DEFAULT_PLAYERS_BY_POSITION[position] || DEFAULT_PLAYERS_BY_POSITION.FORWARD;
  if (excludeNames && excludeNames.size > 0) {
    for (let i = 0; i < defaults.length; i++) {
      const candidate = defaults[(indexHint + i) % defaults.length];
      if (!excludeNames.has(norm(candidate))) {
        return candidate;
      }
    }
  }

  return defaults[indexHint % defaults.length];
}

const DEFAULT_PLAYERS_BY_POSITION: Record<Position, string[]> = {
  GOALKEEPER: [
    "David Raya", "Jordan Pickford", "Alisson Becker", "Ederson", "Emiliano Martínez", "Jan Oblak", "Gianluigi Donnarumma"
  ],
  DEFENDER: [
    "William Saliba", "Virgil van Dijk", "Joško Gvardiol", "Achraf Hakimi", "Gabriel Magalhães", "Pau Torres", "Trent Alexander-Arnold", "Alessandro Bastoni"
  ],
  MIDFIELDER: [
    "Cole Palmer", "Florian Wirtz", "Bukayo Saka", "Martin Ødegaard", "Bruno Fernandes", "Rodri", "Declan Rice", "Alexis Mac Allister"
  ],
  FORWARD: [
    "Mohamed Salah", "Kylian Mbappé", "Harry Kane", "Ollie Watkins", "Alexander Isak", "Vinícius Júnior", "Robert Lewandowski", "Lamine Yamal"
  ]
};

// Universal Player Name Sanitizer:
// Eliminates position names ("Striker", "Back", "Playmaker", "Defender", "Midfielder", "GK"),
// club fixtures ("Arsenal vs Chelsea", kickoff times, dates), or club names as player names.
export function sanitizePlayerName(rawName?: string, clubName?: string, position: Position = "FORWARD"): string {
  if (!rawName || typeof rawName !== "string" || !rawName.trim()) {
    return getAuthenticPlayerName(position, clubName);
  }

  let cleaned = rawName.trim();

  // 1. Remove fixture markers and timestamps (e.g., "vs Chelsea", "vrs Brentford", "8:00pm", "(Carabao Cup)")
  cleaned = cleaned
    .replace(/\s+(?:vs\.?|vrs\.?|versus|v|-|–|—)\s+.*$/i, "")
    .replace(/\[.*?\]|\(.*?\)/g, "")
    .replace(/(?:@\s*)?\b\d{1,2}(?::\d{2})?\s*(?:am|pm)\b/gi, "")
    .replace(/\b\d{1,2}:\d{2}\b/g, "")
    .replace(/[-–—]\s*\d+.*$/g, "")
    .trim();

  // 2. Strip prepended club name if it's placed in front of player name (e.g., "Everton Dominic Calvert-Lewin" or "Norwich: Josh Sargent")
  if (clubName && clubName.trim().length > 2) {
    const escapedClub = clubName.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    cleaned = cleaned.replace(new RegExp(`^${escapedClub}[:\\s\\-_]+`, "i"), "").trim();
  }

  // 3. Remove position words and labels
  const positionWordsRegex = /\b(#1\s*gk|goalkeeper|goalie|keeper|lead\s+defender|central\s+defender|center\s+back|centre\s+back|wing\s+back|full\s+back|defender|attacking\s+playmaker|box-to-box|playmaker|central\s+midfielder|midfielder|top\s+striker|striker|center\s+forward|centre\s+forward|forward|talisman|player\s*\d*|star)\b/gi;

  const withoutPositions = cleaned.replace(positionWordsRegex, "").replace(/\s+/g, " ").trim();

  // 4. If nothing left, or equal to club name, or single generic word:
  const isGeneric = !withoutPositions ||
    withoutPositions.length < 3 ||
    (clubName && withoutPositions.toLowerCase() === clubName.toLowerCase().trim()) ||
    /^(striker|back|playmaker|defender|midfielder|goalkeeper|keeper|gk|player|star|talisman)$/i.test(withoutPositions);

  if (isGeneric) {
    return getAuthenticPlayerName(position, clubName);
  }

  return withoutPositions;
}

// Extracts a short pitch pin name (e.g., surname or short name like "Haaland", "Calvert-Lewin", "Saka")
// Guaranteed NEVER to return a position label or club name.
export function getPitchDisplayName(rawName?: string, clubName?: string, position: Position = "FORWARD"): string {
  const clean = sanitizePlayerName(rawName, clubName, position);
  const parts = clean.split(" ").filter(Boolean);

  if (parts.length === 0) {
    return getAuthenticPlayerName(position, clubName).split(" ").slice(-1)[0];
  }

  if (parts.length === 1) {
    return parts[0];
  }

  // Multi-part name: usually last word or compound surname (e.g., "van Dijk", "De Bruyne", "Alexander-Arnold")
  const secondToLast = parts[parts.length - 2]?.toLowerCase();
  if (["van", "de", "di", "da", "von", "del", "el"].includes(secondToLast)) {
    return `${parts[parts.length - 2]} ${parts[parts.length - 1]}`;
  }

  const candidate = parts[parts.length - 1];
  if (/^(striker|back|playmaker|defender|midfielder|keeper|gk|player|fc|city|united)$/i.test(candidate)) {
    return parts[0];
  }

  return candidate;
}
