/**
 * @author Evan Vandegriff
 */

function Hangman(){
	this.$user_interaction_container = $('.user-interaction-container');
	this.$word_input_container = this.$user_interaction_container.find('.word-input-container');
	this.$word_input = this.$word_input_container.find('.word-input');
	this.$letter_input = this.$user_interaction_container.find('.letter-input');
	this.$start_button = this.$user_interaction_container.find('.word-input-button');
	this.$message_container = $('.message-container');
	this.$message_content = this.$message_container.find('.message-display');
	this.$letter_input_button = this.$user_interaction_container.find('.letter-input-button');
	this.remaining_guesses = 6;
	
	// will contain an array of missed letters
	this.missed_guesses = [];
	// will contain an array of characters of the word
	this.word = [];
	// will contain the current state of the guessing
	this.word_status;
}

Hangman.prototype.init = function(){
	this.init_event_handlers();
};

Hangman.prototype.init_event_handlers = function(){
	var that = this;
	
	this.$start_button.off().on('click', function(){
		var val = that.get_word_input();
		
		if (that.validate_empty(val)){
			that.init_word_array(val);
			that.word_status = new Array(that.word.length).fill('_');
			that.init_guessing_state();
		}
		else{
			that.show_message('Please enter a word!');
		}
	});
	
	this.$letter_input_button.off().on('click', function(){
		var val = that.get_letter_input();
		
		if (that.validate_empty(val) && that.validate_single_letter(val)){
			that.guess(val);
			console.log(that.word_status);
		}
		else{
			that.show_message('Please enter a single letter guess!');
		}
	});
};

Hangman.prototype.init_guessing_state = function(){
	this.$word_input_container.hide();
};

Hangman.prototype.validate_empty = function(str){
	if (!str || str === ''){
		return false;
	}
	else{
		return true;
	}
};

Hangman.prototype.validate_single_letter = function(str){
	if (str.length > 1){
		return false;
	}
	else{
		return true;
	}
};

Hangman.prototype.get_word_input = function(){
	return this.$word_input.val();
};

Hangman.prototype.get_letter_input = function(){
	return this.$letter_input.val();
};

Hangman.prototype.reset_game = function(){
	this.clear_inputs();
	this.animate_reset();
};

Hangman.prototype.animate_reset = function(){
	
};

Hangman.prototype.clear_inputs = function(){
	this.clear_letter_input();
	this.clear_word_input();
};

Hangman.prototype.clear_letter_input = function(){
	this.$letter_input.val('');
};

Hangman.prototype.clear_word_input = function(){
	this.$word_input.val('');
};

Hangman.prototype.show_message = function(message, keep){
	this.$message_content.hide();
	this.$message_content.text(message);
	this.$message_container.fadeIn();
	
	if (!keep){
		this.$message_container.fadeOut(2000);
	}
};

Hangman.prototype.get_matches_indexes = function(guess){
	var indexes = [], letter_index;
	
	for (letter_index = 0; letter_index < this.word.length; letter_index++){
		if (this.word[letter_index] === guess){
			indexes.push(letter_index);
		}
	}
	
	return indexes;
};

Hangman.prototype.guess = function(guess){
	var matches;
	
	guess = guess.toUpperCase();
	
	matches = this.get_matches_indexes(guess);
	
	if (matches.length){
		this.update_word_status_array(guess, matches);
		return true;
	}
	else{
		return false;
	}
};

Hangman.prototype.update_word_status_array = function(letter, matches){
	var index;
	
	for(index = 0; index < matches.length; index++){
		this.word_status[matches[index]] = letter;
	}
};

Hangman.prototype.init_word_array = function(word){
	this.word = word.toUpperCase().split('');
};

Array.prototype.fill = function(val){
    for (var i = 0; i < this.length; i++){
        this[i] = val;
    }
    return this;
};

function run(){
	var new_game = new Hangman();
	new_game.init();
}
	
$(document).ready(function(){
	run();
});