var
    CONST_BUILDING_VILLAGE_HALL = 'village-hall',
    CONST_BUILDING_TOWN_HALL    = 'town-hall',
    CONST_BUILDING_CITY_HALL    = 'city-hall',
    CONST_BUILDING_CAPITOL      = 'capitol',
    CONST_BUILDING_FORT         = 'fort',
    CONST_BUILDING_CITADEL      = 'citadel',
    CONST_BUILDING_CASTLE       = 'castle'
    ;

function TownBuildings(town) {
    this.town = town;

    this.availableBuildings = [
        CONST_BUILDING_VILLAGE_HALL,
        CONST_BUILDING_TOWN_HALL,
        CONST_BUILDING_CITY_HALL,
        CONST_BUILDING_CAPITOL,
        CONST_BUILDING_FORT,
        CONST_BUILDING_CITADEL,
        CONST_BUILDING_CASTLE
    ];

    this.constructedBuildings = [
        CONST_BUILDING_VILLAGE_HALL
    ];

    this._isBuildingConstructed = function(building) {
        return this.constructedBuildings.indexOf(building) !== -1;
    };

    this.hasTownHall = function() {
        return this._isBuildingConstructed(CONST_BUILDING_TOWN_HALL);
    };

    this.hasCityHall = function() {
        return this._isBuildingConstructed(CONST_BUILDING_CITY_HALL);
    };

    this.hasCapitol = function() {
        return this._isBuildingConstructed(CONST_BUILDING_CAPITOL);
    };

    this.hasFort = function() {
        return this._isBuildingConstructed(CONST_BUILDING_FORT);
    };

    this.hasCitadel = function() {
        return this._isBuildingConstructed(CONST_BUILDING_CITADEL);
    };

    this.hasCastle = function() {
        return this._isBuildingConstructed(CONST_BUILDING_CASTLE);
    };

    this._isBuildingAvailable = function(building) {
        return this.availableBuildings.indexOf(building) !== -1;
    };

    this._constructBuilding = function(building) {
        // не разрешаем строить недоступные здания
        if (!this._isBuildingAvailable(building)) {
            return;
        }

        // не строим повторно
        if (this._isBuildingConstructed(building)) {
            return;
        }

        this.constructedBuildings.push(building);
    };

    this.buildFort = function() {
        this._constructBuilding(CONST_BUILDING_FORT);
    };

    this.buildCapitol = function() {
        this._constructBuilding(CONST_BUILDING_CAPITOL);
    };
}
