/**
 * @author Evan Vandegriff
 */

function Hangman(){
	this.$user_interaction_container = $('.user-interaction-container');
	this.$word_input_container = this.$user_interaction_container.find('.word-input-container');
	this.$word_input = this.$word_input_container.find('.word-input');
	this.$letter_input_container = this.$user_interaction_container.find('.letter-input-container');
	this.$letter_input = this.$user_interaction_container.find('.letter-input');
	this.$start_button = this.$user_interaction_container.find('.word-input-button');
	this.$message_container = $('.message-container');
	this.$message_content = this.$message_container.find('.message-display');
	this.$letter_input_button = this.$user_interaction_container.find('.letter-input-button');
	this.$hangman_container = $('.hangman-container');
	this.$reset_button = this.$hangman_container.find('.reset');
	this.$hangman_picture = this.$hangman_container.find('.hangman-picture');
	this.remaining_guesses = 6;
	this.victory_condition = false;
	
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
			that.update_letters();
			$('h3').fadeIn();
			that.$letter_input_container.fadeIn();
		}
		else{
			that.show_message('Please enter a word!');
		}
	});
	
	this.$letter_input_button.off().on('click', function(){
		var val = that.get_letter_input();
		
		if (that.validate_empty(val) && that.validate_single_letter(val)){
			if (that.guess(val)){
				that.update_letters();
				that.clear_letter_input();
				
				if (that.victory_condition){
					that.trigger_victory();
				}
				else{
					that.show_message('Correct Guess!');
				}
			}
			else{
				that.incorrect_guess(val);
				that.clear_letter_input();
				
				if (that.remaining_guesses === 0){
					that.trigger_loss();
				}
				else{
					that.show_message('Incorrect Guess! You have ' + that.remaining_guesses + ' left!');
				}
			}
		}
		else{
			that.show_message('Please enter a single letter guess!');
		}
	});
	
	this.$reset_button.off().on('click', function(){
		that.reset_game();
	});
};

Hangman.prototype.trigger_victory = function(){
	this.$letter_input_container.hide();
	this.show_message('You won! The word was ' + this.word.join(''), true);
};

Hangman.prototype.incorrect_guess = function(letter){
	this.missed_guesses.push(letter.toUpperCase());
	this.update_missed_guesses();
	this.remaining_guesses--;
	this.update_hangman_picture();
};

Hangman.prototype.update_hangman_picture = function(){
	this.$hangman_picture.css('opacity', 0);
	this.$hangman_picture.attr('src', 'assets/images/Hangman-' + this.remaining_guesses + '.png');
	this.$hangman_picture.fadeTo('fast', 1);
};

Hangman.prototype.trigger_loss = function(){
	this.$letter_input_container.hide();
	this.show_message('You lost! The word was ' + this.word.join(''), true);
};

Hangman.prototype.update_missed_guesses = function(){
	var $missed_guesses_container = this.$hangman_container.find('.missed-guesses');
	
	$missed_guesses_container.css('opacity', 0);
	$missed_guesses_container.empty();
	$missed_guesses_container.append(this.missed_guesses.join(','));
	$missed_guesses_container.fadeTo("slow", 1);
};

Hangman.prototype.update_letters = function(){
	var $hangman_letter = $('<div class="hangman-letter"></div>'),
	$word_status_container = this.$hangman_container.find('.hangman-letters'),
	victory_condition = true;
	
	$word_status_container.css('opacity', 0);
	$word_status_container.empty();
	
	for (var letter = 0; letter < this.word_status.length; letter++){
		$word_status_container.append($hangman_letter.clone().text(this.word_status[letter]));
		
		if (this.word_status[letter] === '_'){
			victory_condition = false;
		}
	}
	
	this.victory_condition = victory_condition;
	
	$word_status_container.fadeTo("slow", 1);
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
	this.missed_guesses = [];
	this.remaining_guesses = 6;
	this.word = [];
	this.word_status = null;
	this.clear_inputs();
	this.animate_reset();
};

Hangman.prototype.animate_reset = function(){
	this.$hangman_container.find('.hangman-letters, .missed-guesses').empty();
	this.$letter_input_container.hide();
	this.$message_container.hide();
	this.$hangman_picture.hide();
	this.$hangman_picture.attr('src', 'assets/images/Hangman-6.png');
	this.$hangman_picture.fadeIn();
	this.$word_input_container.fadeIn();
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
	this.$message_container.css('opacity', 0);
	this.$message_content.text(message);
	this.$message_container.fadeTo('fast', 1);
	
	if (!keep){
		this.$message_container.fadeTo(2500, 0);
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