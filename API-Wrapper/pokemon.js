/**
         * Pokémon API Wrapper
         * A Promise-based wrapper for the public Pokémon API
         */
class PokemonAPI {
    constructor() {
        this.baseUrl = 'https://pokeapi.co/api/v2';
        this.cache = {};
    }

    /**
     * Make an API request with error handling
     * @param {string} endpoint - API endpoint to fetch
     * @returns {Promise} - Promise with the response data
     */
    async fetchData(endpoint) {
        // Check cache first
        if (this.cache[endpoint]) {
            return this.cache[endpoint];
        }

        try {
            // Add base URL if endpoint doesn't include it
            const url = endpoint.includes('http') ? endpoint : `${this.baseUrl}${endpoint}`;
            
            const response = await fetch(url);
            
            // Check if response is okay
            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Cache the response
            this.cache[endpoint] = data;
            
            return data;
        } catch (error) {
            // Handle different types of errors
            if (error.name === 'TypeError') {
                console.error('Network error: Check your connection');
                throw new Error('Network error: Unable to connect to Pokémon API');
            } else {
                console.error(`Error fetching data from ${endpoint}:`, error.message);
                throw error;
            }
        }
    }

    /**
     * Get a Pokémon by name or ID
     * @param {string|number} nameOrId - Pokémon name or ID
     * @returns {Promise} - Promise with Pokémon data
     */
    async getPokemon(nameOrId) {
        try {
            return await this.fetchData(`/pokemon/${nameOrId.toString().toLowerCase()}`);
        } catch (error) {
            throw new Error(`Failed to get Pokémon "${nameOrId}": ${error.message}`);
        }
    }

    /**
     * Get a list of Pokémon with pagination
     * @param {number} limit - Number of Pokémon to fetch
     * @param {number} offset - Starting position
     * @returns {Promise} - Promise with list of Pokémon
     */
    async getPokemonList(limit = 20, offset = 0) {
        try {
            return await this.fetchData(`/pokemon?limit=${limit}&offset=${offset}`);
        } catch (error) {
            throw new Error(`Failed to get Pokémon list: ${error.message}`);
        }
    }

    /**
     * Get Pokémon type information
     * @param {string} type - Type name
     * @returns {Promise} - Promise with type data
     */
    async getType(type) {
        try {
            return await this.fetchData(`/type/${type.toLowerCase()}`);
        } catch (error) {
            throw new Error(`Failed to get type "${type}": ${error.message}`);
        }
    }

    /**
     * Get details for a Pokémon ability
     * @param {string} ability - Ability name
     * @returns {Promise} - Promise with ability data
     */
    async getAbility(ability) {
        try {
            return await this.fetchData(`/ability/${ability.toLowerCase()}`);
        } catch (error) {
            throw new Error(`Failed to get ability "${ability}": ${error.message}`);
        }
    }

    /**
     * Get all Pokémon of a specific type
     * @param {string} type - Type name (e.g., 'electric', 'water')
     * @returns {Promise} - Promise with list of Pokémon of that type
     */
    async getPokemonByType(type) {
        try {
            const typeData = await this.getType(type);
            return typeData.pokemon;
        } catch (error) {
            throw new Error(`Failed to get Pokémon of type "${type}": ${error.message}`);
        }
    }

    /**
     * Clear the cache
     */
    clearCache() {
        this.cache = {};
        console.log('Cache cleared');
    }
}

// Create a new instance of the PokemonAPI
const pokeApi = new PokemonAPI();

// DOM Elements
const pokemonList = document.getElementById('pokemonList');
const pokemonDetail = document.getElementById('pokemonDetail');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const randomBtn = document.getElementById('randomBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Application state
let currentOffset = 0;
const limit = 20;

// Initialize the application
window.addEventListener('DOMContentLoaded', () => {
    loadPokemonList();
    setupEventListeners();
});

// Set up event listeners
function setupEventListeners() {
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    loadMoreBtn.addEventListener('click', () => loadPokemonList(currentOffset + limit));
    randomBtn.addEventListener('click', loadRandomPokemon);
    prevBtn.addEventListener('click', () => {
        if (currentOffset >= limit) {
            loadPokemonList(currentOffset - limit);
        }
    });
    nextBtn.addEventListener('click', () => {
        loadPokemonList(currentOffset + limit);
    });
}

// Load Pokemon list
async function loadPokemonList(offset = 0) {
    try {
        pokemonList.innerHTML = '<div class="loading">Loading Pokémon...</div>';
        
        const data = await pokeApi.getPokemonList(limit, offset);
        currentOffset = offset;
        
        // Update pagination buttons
        prevBtn.disabled = offset === 0;
        nextBtn.disabled = !data.next;
        
        // Clear the list
        pokemonList.innerHTML = '';
        
        // Create a card for each Pokémon
        for (const item of data.results) {
            // Extract the ID from the URL
            const id = item.url.split('/').filter(Boolean).pop();
            
            const card = document.createElement('div');
            card.className = 'pokemon-card';
            card.innerHTML = `
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${item.name}">
                <h3>${item.name}</h3>
            `;
            
            card.addEventListener('click', () => loadPokemonDetails(item.name));
            pokemonList.appendChild(card);
        }
    } catch (error) {
        pokemonList.innerHTML = `<div class="loading">Error: ${error.message}</div>`;
    }
}

// Load Pokémon details
async function loadPokemonDetails(nameOrId) {
    try {
        pokemonDetail.innerHTML = '<div class="loading">Loading Pokémon details...</div>';
        
        const pokemon = await pokeApi.getPokemon(nameOrId);
        
        const typeHtml = pokemon.types.map(t => 
            `<span class="type-pill ${t.type.name}">${t.type.name}</span>`
        ).join('');
        
        const statsHtml = pokemon.stats.map(stat => {
            const statValue = stat.base_stat;
            const percentage = Math.min(100, (statValue / 255) * 100);
            
            return `
                <div class="stat-row">
                    <div class="stat-name">${stat.stat.name.replace('-', ' ')}</div>
                    <div class="stat-bar-container">
                        <div class="stat-bar" style="width: ${percentage}%"></div>
                    </div>
                    <div class="stat-value">&nbsp;${statValue}</div>
                </div>
            `;
        }).join('');
        
        const abilitiesHtml = pokemon.abilities.map(ability => 
            `<div class="ability-item">${ability.ability.name.replace('-', ' ')}</div>`
        ).join('');
        
        pokemonDetail.innerHTML = `
            <div class="detail-card">
                <img class="pokemon-image" src="${pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}" alt="${pokemon.name}">
                <h2 class="pokemon-name">${pokemon.name}</h2>
                <div class="pokemon-id">#${pokemon.id.toString().padStart(3, '0')}</div>
                
                <div class="pokemon-types">
                    ${typeHtml}
                </div>
                
                <div class="pokemon-info">
                    <p>Height: ${pokemon.height / 10} m</p>
                    <p>Weight: ${pokemon.weight / 10} kg</p>
                </div>
                
                <h3>Base Stats</h3>
                <div class="stats-container">
                    ${statsHtml}
                </div>
                
                <h3>Abilities</h3>
                <div class="abilities-container">
                    ${abilitiesHtml}
                </div>
            </div>
        `;
    } catch (error) {
        pokemonDetail.innerHTML = `<div class="loading">Error: ${error.message}</div>`;
    }
}

// Handle search
function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        loadPokemonDetails(searchTerm.toLowerCase());
    }
}

// Load a random Pokémon
async function loadRandomPokemon() {
    try {
        // There are approximately 898 Pokémon in the API
        const randomId = Math.floor(Math.random() * 898) + 1;
        loadPokemonDetails(randomId);
    } catch (error) {
        pokemonDetail.innerHTML = `<div class="loading">Error: ${error.message}</div>`;
    }
}