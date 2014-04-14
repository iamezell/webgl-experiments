define(function(){


	// for testing purposes we will hardcode some values and use the base class as if it was an implementation object.
	Game = function(){
		


		this.setup = function(){
			console.log('I am being set up!')
		}
	}

	return Game;

});