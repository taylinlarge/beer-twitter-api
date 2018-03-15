// "use strict";

var BeerApi = (function(){
	
	var shared = {};

	function populateBrews(brewsResults) {
		var beerResults = JSON.parse(brewsResults);
		console.log(beerResults);


		var infoDiv = $('.search-info');
		var searchResults = $('.search-results');
		var searchImg = $('.search-img');
		var searchSpecs = $('.search-specs');
		var searchList = $('<ul>');

		if ($('#select-box').val() == 'beer') {

			beerResults.data.forEach(function(beerData) {

				var listItem = $('<li>');
				var beerName = $('<h3>');
				beerName.html(beerData.name);
				beerName.addClass('beer-name');
				listItem.addClass('list-item');
				listItem.append(beerName);
				searchList.append(listItem);
				searchResults.append(searchList);
				infoDiv.append(searchResults);

				listItem.on('click', function(e){
					TwitterApi.hitTwitterApi(beerData.name, TwitterApi.populateTweets);
					var abv = $('<p>');
					var ibu = $('<p>');
					var availability = $('<p>');
					var des = $('<p>');
					var pairing = $('<p>');
					var selectBeerName = $('<h3>');
					var topInfoDiv = $('<div>');
					var abvIbuAvaDiv = $('<div>');
					var moreBeerInfoDiv = $('<div>');
					var beerImg = $('<img>');

					$('.brew-info').addClass('active');
					TweenMax.to(searchResults, 0.2, {opacity: 0, display: "none"});
					TweenMax.to('.brew-info', 0.2, {opacity: 1, display: "flex"});

					if (beerData.labels) {
						beerImg.attr('src', beerData.labels.medium)
					} else {
						beerImg.attr('src', '../dist/img/unknown.png');
					}

					
					selectBeerName.addClass('select-beer-name');
					selectBeerName.html(beerData.name);

					if (beerData.abv) {
						abv.html('ABV: ' + beerData.abv);
					} else {
						abv.html('ABV: There\'s nothing to be found.');
					}
					if (beerData.ibu) {
						ibu.html('IBU: ' + beerData.ibu);
					} else {
						ibu.html('IBU: There\'s nothing to be found.');
					}
					if (beerData.available) {
						availability.html('Availability: ' + beerData.available.description);
					} else {
						availability.html('Availability: There\'s nothing to be found.');
					}
					if (beerData.description) {
						des.html('Description: ' + beerData.description);
					} else {
						des.html('Description: There\'s nothing to be found.');
					}
					if (beerData.foodPairings) {
						pairing.html('Food Pairing: ' + beerData.foodPairings);
					} else {
						pairing.html('Food Pairing: There\'s nothing to be found.');
					}
					abvIbuAvaDiv.append(abv);
					abvIbuAvaDiv.append(ibu);
					abvIbuAvaDiv.addClass('top-info__abv-ibu');


					topInfoDiv.append(selectBeerName);
					topInfoDiv.append(abvIbuAvaDiv);
					topInfoDiv.append(availability);
					topInfoDiv.addClass('top-info-container');

					moreBeerInfoDiv.append(des);
					moreBeerInfoDiv.append(pairing);
					moreBeerInfoDiv.addClass('more-beer-info')

					$('.search-img').append(beerImg);
					$('.search-specs').append($('.search-img'));

					$('.search-specs').append(topInfoDiv);
					$('.search-specs').append(moreBeerInfoDiv);
				})
			})

		}

		if ($('#select-box').val() == 'brewery') {
			var breweryImg = $('<img>');

			beerResults.data.forEach(function(beerData) {
				var listItem = $('<li>');
				var breweryName = $('<h3>');
				// breweryName.attr('data-index', i);
				breweryName.html(beerData.name);
				breweryName.addClass('beer-name');
				listItem.addClass('list-item');
				listItem.append(breweryName);
				searchList.append(listItem);
				searchResults.append(searchList);
				infoDiv.append(searchResults);

				listItem.on('click', function(e){
					removeInfoElements();
					$('.brew-info').addClass('active');
					TwitterApi.hitTwitterApi(beerData.name, TwitterApi.populateTweets);

					var est = $('<p>');
					var website = $('<a>');
					var breweryDes = $('<p>');
					var topInfoDiv = $('<div>');
					var moreBeerInfoDiv = $('<div>');
					var selectBreweryName = $('<h3>');

					TweenMax.to(searchResults, 0.2, {opacity: 0, display: "none"});
					TweenMax.to('.brew-info', 0.2, {opacity: 1, display: "flex"});
					
					if (beerData.images) {
						breweryImg.attr('src', beerData.images.squareLarge);
					} else {
						breweryImg.attr('src', '../dist/img/unknown.png');
					}
					$('.search-img').append(breweryImg);
					selectBreweryName.addClass('select-beer-name');
					selectBreweryName.html(beerData.name);
					if (beerData.established) {
						est.html('Established: ' + beerData.established);
					} else {
						est.html('Established: There\'s nothing to be found.');
					}
					if (beerData.website) {
						website.attr('href', beerData.website);
						website.text(beerData.name);
					} else {
						website.html('Website: There\'s nothing to be found.');
					}
					if (beerData.description) {
						breweryDes.html(beerData.description);
					} else {
						breweryDes.html('There\'s nothing to be found.');
					}
					topInfoDiv.append(selectBreweryName);
					topInfoDiv.append(est);
					topInfoDiv.append(website);
					topInfoDiv.addClass('top-info-container');

					moreBeerInfoDiv.append(breweryDes);
					moreBeerInfoDiv.addClass('more-beer-info');

					$('.search-specs').append(topInfoDiv);
					$('.search-specs').append(moreBeerInfoDiv);
				})
			});
		}

		if ($('#select-box').val() == 'guild') {

			beerResults.data.forEach(function(beerData){
				var listItem = $('<li>');
				var guildName = $('<h3>');
				guildName.html(beerData.name);
				guildName.addClass('beer-name');
				listItem.addClass('list-item');
				listItem.append(guildName);
				searchList.append(listItem);
				searchResults.append(searchList);
				infoDiv.append(searchResults);

				listItem.on('click', function(e){
					TwitterApi.hitTwitterApi(beerData.name, TwitterApi.populateTweets);
					var guildWebsite = $('<a>');
					var guildDes = $('<p>');
					var selectGuildName = $('<h3>');

					TweenMax.to(searchResults, 0.2, {opacity: 0, display: "none"});
					TweenMax.to('.brew-info', 0.2, {opacity: 1, display: "block"});
					selectGuildName.addClass('select-beer-name');
					selectGuildName.html('Guild Name: ' + beerData.name);

					if (beerData.website) {
						guildWebsite.attr('href', beerData.website);
						guildWebsite.text(beerData.name);
					} else {
						guildWebsite.html('Guild Website: There\'s nothing to be found.');
					}
					if (beerData.description) {
						guildDes.html('Description: ' + beerData.description);
					} else {
						guildDes.html('Description: There\'s nothing to be found.');
					}
					$('.search-specs').append(selectGuildName);
					$('.search-specs').append(guildWebsite);
					$('.search-specs').append(guildDes);
				})
			})
		}
	};

	function removeListElements() {
		if($('.search-results').length) {
			for (var i = $('.search-results').length - 1; i >= 0; i--) {
				$('ul').remove();
			}
		} else {
			return null;
		}

		if($('.twitter-module').length) {
			for (var i = $('.twitter-module').length - 1; i >= 0; i--) {
				$('.twitter-wrapper').remove();
			}
		}
	}

	function removeInfoElements() {
		$('.search-img img').remove();

		if($('.search-specs').length) {
			for (var i = $('.search-specs').length - 1; i >= 0; i--) {
				// $('.select-beer-name').remove();
				$('.top-info-container').remove();
				$('.more-beer-info').remove();
			}
		}
	}

	function removeImg() {
		if($('.search-img').length) {
			$('.search-img img').remove();
		}
	}

	function hitBeerApi() {
		$('.back-button').show();
		var brewsUrlPath = 'brews.php?_ep=/search&q=' + $('.input-1').val();
		if ($('#select-box').val()){
			brewsUrlPath +=  '&type=' + $('#select-box').val();
		}
		if ($('.input-1').val() == '') {
			return;
		}
		$.ajax({
			url: brewsUrlPath 
		})
		.done(populateBrews);
	}

	function setupListeners(e){
		var formField = $('form');
		var brewInfo = $('.brew-info');
		$('.button-1').on('click',function(e){
			e.preventDefault();
			removeListElements();
			formField.hide();
			hitBeerApi();
		});

		$('.back-button').on('click', function(e) {
			if (brewInfo.hasClass('active')) {
				$('.twitter-module').css('background-color', 'white');
				removeInfoElements();
				removeImg();
				TwitterApi.hitTwitterApi($('.input-1').val(), TwitterApi.populateTweets);
				brewInfo.removeClass('active');
				TweenMax.to('.brew-info', 1, {opacity: 0, display: 'none'});
				TweenMax.to('.search-results', 1, {opacity: 1, display: 'block'});
			} else {
				$('.twitter-module').css('background-color', 'transparent');
				$('.twitter-module').css('border', 'none');
				removeListElements();
				$('.form').show();
				$('.back-button').hide();
			}
		})
	};

	function init(){
		setupListeners();
	};

	shared.init = init;

	return shared;
}());

BeerApi.init();

var TwitterApi = (function(){
	var shared = {};

	function populateTweets(tweetResults) {
		var tweets = JSON.parse(tweetResults);
		console.log(tweets);

		$('.twitter-module').css('background-color', 'white');
		$('.twitter-module').css('border', '10px solid cyan');

		function createContentDiv() {
			var twitterWrapper = $('<div>');
			var tweetContent = $('<div>');
			var userContainer = $('<div>');
			var userPic = $('<div>');
			var userImg = $('<img>');
			var followButton = $('<div>');
			var followButtonLink = $('<a>');
			var tweetTextDiv = $('<div>');
			var extraMediaContainer	= $('<div>');
			var extraMediaImg = $('<img>');
			var nameContainer = $('<div>');
			var verifiedUser = $('<div>'); 
			var verifiedContainer = $('<div>');
			var verifiedImg = $('<img>');
			var userName = $('<h4>');
			var screenName = $('<p>');
			var userTweet = $('<div>');
			var retweetContainer = $('<div>');
			var retweet = $('<p>');
			var like = $('<p>');
			var para = $('<p>');
			

			function createTimeStamp() {
				var tweetTime = $('<p>');

				let timeInfo = tweets.statuses[i].created_at;
				let splitDate = timeInfo.split(' ');

				let hour;
				let timeOfDay;

				let splitTime = splitDate[3].split(':');

				parseInt(splitTime[0]);

				if (splitTime[0] > 12 ) {
					hour = splitTime[0] - 12;
					timeOfDay = 'PM';
				} else {
					hour = splitTime[0];
					timeOfDay = "AM";
				}

				tweetTime.addClass('timestamp');
				tweetTime.html(hour + ':' + splitTime[1] + ' ' + timeOfDay + ' - ' + splitDate[2] + ' ' + splitDate[1] + ' ' + splitDate[5]);
				tweetTextDiv.append(tweetTime);
			}

			tweetContent.addClass('tweet-content');
			userContainer.addClass('user-container');
			nameContainer.addClass('name-container');
			userPic.addClass('user-pic');
			retweetContainer.addClass('retweet-container');
			retweet.addClass('retweet');
			like.addClass('like');
			followButton.addClass('follow-button');
			tweetTextDiv.addClass('tweet-text-div');
			twitterWrapper.addClass('twitter-wrapper');
			userTweet.addClass('tweet-content__content');

			$('.twitter-module').append(twitterWrapper);
			twitterWrapper.append(tweetContent)
			tweetContent.append(userContainer);
			userContainer.append(userPic);
			userPic.append(userImg);
			userContainer.append(nameContainer);
			
			if (tweets.statuses[i].user.verified == true) {
				verifiedContainer.append(verifiedImg);
				verifiedContainer.addClass('verified-container');
				verifiedImg.attr('src', '../dist/img/verified.png');
				verifiedUser.append(userName);
				verifiedUser.addClass('verified-user');
				verifiedUser.append(verifiedContainer);
				nameContainer.append(verifiedUser);
				nameContainer.append(screenName);
			} else {
				nameContainer.append(userName);	
				nameContainer.append(screenName);
			}

			followButton.append(followButtonLink);
			userContainer.append(followButton);
			tweetContent.append(tweetTextDiv);
			tweetTextDiv.append(userTweet);
			userTweet.append(para);

			if (tweets.statuses[i].extended_entities) {
				extraMediaContainer.addClass('media-container');
				extraMediaImg.addClass('media-img');
				userTweet.append(extraMediaContainer);
				extraMediaContainer.append(extraMediaImg);
				extraMediaImg.attr('src', tweets.statuses[i].extended_entities.media[0].media_url);
			}

			createTimeStamp();
			tweetTextDiv.append(retweetContainer);
			retweetContainer.append(retweet);
			retweetContainer.append(like);
			
			followButtonLink.attr('href', 'http://www.twitter.com/' + tweets.statuses[i].user.screen_name);
			followButtonLink.html('Follow');
			retweet.html('<span class="retweet-count">' + tweets.statuses[i].retweet_count + '</span>' +  ' Retweets');
			like.html('<span class="retweet-count">' + tweets.statuses[i].favorite_count + '</span>' +  ' Likes');
			userImg.attr('src', tweets.statuses[i].user.profile_image_url);
			userName.html(tweets.statuses[i].user.name);
			screenName.html('@' + tweets.statuses[i].user.screen_name);
			para.html(RegexModule.highlightTweets(tweets.statuses[i].text));

		}
		
		// for (var i = tweets.statuses.length - 1; i >= 0; i--) {
		// 	createContentDiv();
		// }

		for (var i = 0; i < tweets.statuses.length; i++) {
			createContentDiv();
		}
	}

	function removeElements() {
		if($('.twitter-module').length) {
			for (var i = $('.twitter-module').length - 1; i >= 0; i--) {
				$('.twitter-wrapper').remove();
			}
		} else {
			// $('.twitter-module').css('background-color', 'transparent');
		}
	}

	function setupListeners(e){
		$('.button-1').on('click', function(e){	
			e.preventDefault();
			removeElements();
			var twitterUrlPath = 'twitter-proxy.php';
			if ($('.input-1').val() == '') {
				return;
			}
			$.ajax({
				url: twitterUrlPath + '?op=search_tweets&q=' + $('.input-1').val() + '+' + $('#select-box').val() + '&count=10'
			})
			.done(populateTweets);
		})
	};

	function hitTwitterApi(item, populateTweets) {
		var twitterUrlPath = 'twitter-proxy.php';
		let finishedTwitterUrlPath = twitterUrlPath;
		removeElements();

		if ($('#select-box').val() == 'brewery') {
			finishedTwitterUrlPath += '?op=search_tweets&q=' + item + '&count=10';
		} else  {
			finishedTwitterUrlPath += '?op=search_tweets&q=' + item + '+' + $('#select-box').val() + '&count=10';
		}
		$.ajax({
			url: finishedTwitterUrlPath
		})
		.done(populateTweets);
	}

	function init(){
		setupListeners();
	}

	shared.init = init;
	shared.hitTwitterApi = hitTwitterApi;
	shared.populateTweets = populateTweets;

	return shared;

}());

TwitterApi.init();

var RegexModule = (function() {

	var shared = {};

	function urlRegexFunction(data) {
        var urlRegex = /((http|ftp|https)?:\/\/\S+)/g;
        var firstUrlRegex = data.replace(urlRegex,"<a href='$1' class='twitter-link'>$1</a>");
        return firstUrlRegex;
    }

    function mentionRegexFunction(data) {
        var mentionRegex = /(^|\W)(@[a-z\d][\w-]*)/ig;
    	var firstMentionRegex = data.replace(mentionRegex, "<a  href='www.twitter.com/$2' class='mention'>$2</a>");
    	return firstMentionRegex;
    }

    function hashtagRegexFunction(data) {
        var hashtagRegex = /(^|\W)(#[a-z\d][\w-]*)/ig;
        var firstHashtagRegex = data.replace(hashtagRegex, "<a href='$2' class='hashtag'>$2</a>");
        return firstHashtagRegex;
    }

    function keywordRegexFunction(data, keyword) {
    	var searchWord = new RegExp("(" + keyword + ")", "gi");
        return data.replace(searchWord, "<span class='search-word'> $1 </span>");
    }

    function highlightTweets (data) {
    	var linkHighlight = urlRegexFunction(data);
    	var mentionHighlight = mentionRegexFunction(linkHighlight);
    	var hashtagHighlight = hashtagRegexFunction(mentionHighlight);
    	var keywordHighlight = keywordRegexFunction(hashtagHighlight);

    	return keywordHighlight; 
    }

    shared.url = urlRegexFunction;
    shared.mention = mentionRegexFunction;
    shared.hashtag = hashtagRegexFunction;
    shared.keyword = keywordRegexFunction;
    shared.highlightTweets = highlightTweets;

    return shared;

}());