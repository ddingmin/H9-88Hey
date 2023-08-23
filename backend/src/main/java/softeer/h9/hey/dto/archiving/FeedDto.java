package softeer.h9.hey.dto.archiving;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FeedDto {
	private Long feedId;
	private Integer userId;
	private Boolean isMarked;
}
