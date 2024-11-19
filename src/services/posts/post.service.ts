import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/posts/post.entity';
import { UserEntity } from 'src/entities/users/user.entity';
import { CreateNewPostModel } from 'src/models/posts/Create-NewPost.model';
import { Repository } from 'typeorm';
import { UserService } from '../users/user.service';
import { TagEntity } from 'src/entities/tags/tag.entity';
import { TagService } from '../tags/tag.service';
import { PostTagEntity } from 'src/entities/tags/post.tag.entity';
import { PostModel } from 'src/models/posts/post.model';
import { TagModel } from 'src/models/tags/Tag.model';
import { UserPostModel } from 'src/models/users/Post-User.model';
import { PostCardModel } from 'src/models/posts/post-card.model';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(PostTagEntity)
    private readonly postTag: Repository<PostTagEntity>,
    private readonly tagService: TagService,
    private readonly userService: UserService,
  ) {}

  async create(
    createModel: CreateNewPostModel,
    idUser: bigint,
  ): Promise<PostModel> {
    let tags: TagEntity[] = [];

    // Obtienes el usuario mediante el servicio
    const user: UserEntity = await this.userService.getByIdEntity(idUser);

    // Si hay tags en el modelo, los obtienes o creas
    if (createModel.tags.length >= 1) {
      tags = await this.tagService.createOrGetTag(createModel.tags);
    }

    // Creas la publicación sin las relaciones de tags aún
    const post = this.postRepository.create({
      titlePost: createModel.titlePost,
      contentPost: createModel.contentPost,
      userCreator: user,
    });

    // Guardas la publicación
    const savedPost = await this.postRepository.save(post);

    // Si tienes tags, los asocias con la publicación
    const tagsModel: TagModel[] = [];
    if (tags.length > 0) {
      const postTags: PostTagEntity[] = tags.map((tag) => {
        const postTag = new PostTagEntity();
        postTag.post = savedPost; // Asociamos el post
        postTag.tags = tag; // Asociamos el tag
        return postTag; // Devolvemos el objeto para que `map` lo procese
      });

      // Guardas la relación entre los tags y la publicación
      const tagsPosts = await this.postTag.save(postTags);

      for (let tagModel1 of tagsPosts) {
        let tagModel = new TagModel(tagModel1.tags.id, tagModel1.tags.name);
        tagsModel.push(tagModel);
      }
    }

    const userModel = new UserPostModel(
      user.id,
      user.name,
      user.userName,
      user.lastName,
      user.email,
      user.imgAvatar !== null ? user.imgAvatar.formatedTitle : '',
    );

    return await new PostModel(
      post.id,
      post.titlePost,
      tagsModel,
      post.createdAT,
      userModel,
    );
  }

  async getAllPost() {
    const posts = await this.postRepository.find({
      where: {
        isDelated: false,
      },
      relations: ['userCreator', 'userCreator.imgAvatar'], // Obtener los datos relacionados del creador del post
    });

    let postModels: PostModel[] = [];

    for (let post of posts) {
      const tags = await this.postTag.find({
        where: {
          post: { id: post.id },
        },
        relations: ['tags'],
      });
      const tagsList: TagModel[] =
        tags.length > 0
          ? tags.map((tag) => new TagModel(tag.tags.id, tag.tags.name))
          : [];

      const userModel = new UserPostModel(
        post.userCreator.id,
        post.userCreator.name,
        post.userCreator.userName,
        post.userCreator.lastName,
        post.userCreator.email,
        post.userCreator.imgAvatar !== null
          ? post.userCreator.imgAvatar.formatedTitle
          : '',
      );

      let postModel = new PostModel(
        post.id,
        post.titlePost,
        tagsList,
        post.createdAT,
        userModel,
      );

      postModels.push(postModel);
    }
    return postModels;
  }

  async getById(id: number) {
    const Id = await BigInt(id);

    const post = await this.postRepository.findOne({
      where: {
        id: Id,
      },
      relations: ['userCreator', 'userCreator.imgAvatar'],
    });

    const tags = await this.postTag.find({
      where: {
        post: { id: post.id },
      },
      relations: ['tags'],
    });

    const tagsList: TagModel[] =
      tags.length > 0
        ? tags.map((tag) => new TagModel(tag.tags.id, tag.tags.name))
        : [];

    const userModel = new UserPostModel(
      post.userCreator.id,
      post.userCreator.name,
      post.userCreator.userName,
      post.userCreator.lastName,
      post.userCreator.email,
      post.userCreator.imgAvatar !== null
        ? post.userCreator.imgAvatar.formatedTitle
        : '',
    );

    return await new PostCardModel(
      post.id,
      post.titlePost,
      tagsList,
      post.createdAT,
      userModel,
      post.contentPost,
    );
  }
}
