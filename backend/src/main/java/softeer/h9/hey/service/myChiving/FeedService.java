package softeer.h9.hey.service.myChiving;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import softeer.h9.hey.domain.archiving.Feed;
import softeer.h9.hey.dto.myChiving.request.BookmarkRequest;
import softeer.h9.hey.dto.myChiving.response.BookmarkResponse;
import softeer.h9.hey.repository.myChiving.FeedRepository;

@Service
@RequiredArgsConstructor
public class FeedService {
	private final FeedRepository repository;

	public BookmarkResponse hasBookmark(
		final int userId,
		final BookmarkRequest request) {

		Feed result = repository.hasBookmark(userId, request.getFeedId());

		return BookmarkResponse.of(result.getIsMarked());
	}
}