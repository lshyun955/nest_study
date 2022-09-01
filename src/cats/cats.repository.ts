import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';
import { Comments } from 'src/comments/comments.schema';

@Injectable()
export class CatsRepository {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
  ) {}

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ email });
      return result ? true : false;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    return await this.catModel.findOne({ email });
  }

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }

  async findByIdAndUpdateImg(catId: string, fileName: string) {
    const cat = await this.catModel.findById(catId).select('-password');
    cat.imgUrl = `http://localhost:8000/media/${fileName}`;
    const newCat = await cat.save();

    return newCat.readOnlyData;
  }

  findAll() {
    const result = this.catModel
      .find()
      .populate({ path: 'comments', model: this.commentsModel });
    return result;
  }
}
