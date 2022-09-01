import { Injectable } from '@nestjs/common';
import { CommentsRepositroy } from '../comments.repository';
import { CommentsCreateDto } from '../dto/comments.create.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepositroy) {}

  async getAllComments() {
    return await this.commentsRepository.getAllComments();
  }

  async createComment(id: string, comments: CommentsCreateDto) {
    return await this.commentsRepository.createComment(id, comments);
  }

  async plusLike(id: string) {
    return await this.commentsRepository.plusLike(id);
  }
}
