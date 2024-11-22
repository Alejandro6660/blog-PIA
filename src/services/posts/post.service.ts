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

  // async create(
  //   createModel: CreateNewPostModel,
  //   idUser: bigint,
  // ): Promise<PostModel> {
  //   let tags: TagEntity[] = [];

  //   // Obtienes el usuario mediante el servicio
  //   const user: UserEntity = await this.userService.getByIdEntity(idUser);

  //   // Si hay tags en el modelo, los obtienes o creas
  //   if (createModel.tags.length >= 1) {
  //     tags = await this.tagService.createOrGetTag(createModel.tags);
  //   }

  //   // Creas la publicación sin las relaciones de tags aún
  //   const post = this.postRepository.create({
  //     titlePost: createModel.titlePost,
  //     contentPost: createModel.contentPost,
  //     userCreator: user,
  //   });

  //   // Guardas la publicación
  //   const savedPost = await this.postRepository.save(post);

  //   // Si tienes tags, los asocias con la publicación
  //   const tagsModel: TagModel[] = [];
  //   if (tags.length > 0) {
  //     const postTags: PostTagEntity[] = tags.map((tag) => {
  //       const postTag = new PostTagEntity();
  //       postTag.post = savedPost; // Asociamos el post
  //       postTag.tag = tag; // Asociamos el tag
  //       return postTag; // Devolvemos el objeto para que `map` lo procese
  //     });

  //     // Guardas la relación entre los tags y la publicación
  //     const tagsPosts = await this.postTag.save(postTags);

  //     for (let tagModel1 of tagsPosts) {
  //       let tagModel = new TagModel(tagModel1.tag.id, tagModel1.tag.name);
  //       tagsModel.push(tagModel);
  //     }
  //   }

  //   const userModel = new UserPostModel(
  //     user.id,
  //     user.name,
  //     user.userName,
  //     user.lastName,
  //     user.email,
  //     user.imgAvatar !== null ? user.imgAvatar.formatedTitle : '',
  //   );

  //   return await new PostModel(
  //     post.id,
  //     post.titlePost,
  //     tagsModel,
  //     post.createdAT,
  //     userModel,
  //   );
  // }

  async getAllPost(): Promise<PostModel[]> {
    const posts = await this.postRepository
      .createQueryBuilder('t0')
      .select([
        't0.id AS IdPost',
        't0.titlePost AS Title',
        't0.createdAT AS DateCreate',
        't1.id AS UserId',
        't1.name AS name',
        't1.lastname AS lastname',
        't1.userName AS userName',
        't1.email AS email',
        `COALESCE(t2.formatedTitle, '') AS UserAvatar`,
        'COUNT(DISTINCT t3.id) AS commentsCount',
        'COUNT(DISTINCT t4.post_id) AS likesCount',
        `JSON_AGG(JSON_BUILD_OBJECT('id', t6.id, 'name', t6.name)) AS Tags`,
      ])
      .leftJoin('t0.userCreator', 't1')
      .leftJoin('t1.imgAvatar', 't2')
      .leftJoin('t0.coments', 't3', 't3.isDelated = :isDelated', {
        isDelated: false,
      })
      .leftJoin('t0.likes', 't4')
      .leftJoin('t0.tags', 't5')
      .innerJoin('t5.tag', 't6')
      .groupBy('t0.id')
      .addGroupBy('t1.id')
      .addGroupBy('t2.formatedTitle')
      .orderBy('t0.createdAT', 'DESC')
      .getRawMany();

    const postsModel: PostModel[] = [];
    posts.forEach((post) => {
      let userModel = new UserPostModel(
        post.userid,
        post.name,
        post.lastname,
        post.username,
        post.email,
        post.useravatar,
      );

      let tags: TagModel[] = [];
      post.tags.forEach((tag) => {
        let tagModel = new TagModel(tag.id, tag.name);
        tags.push(tagModel);
      });

      let postModel = new PostModel(
        post.idpost,
        post.title,
        tags,
        post.datecreate,
        userModel,
        post.commentscount,
        post.likescount,
      );

      postsModel.push(postModel);
    });
    return postsModel;
  }

  async getAllByIdUser(id: number) {
    const Id = await BigInt(id);
    const posts = await this.postRepository
      .createQueryBuilder('t0')
      .select([
        't0.id AS IdPost',
        't0.titlePost AS Title',
        't0.createdAT AS DateCreate',
        't1.id AS UserId',
        't1.name AS name',
        't1.lastname AS lastname',
        't1.userName AS userName',
        't1.email AS email',
        `COALESCE(t2.formatedTitle, '') AS UserAvatar`,
        'COUNT(DISTINCT t3.id) AS commentsCount',
        'COUNT(DISTINCT t4.post_id) AS likesCount',
        `JSON_AGG(JSON_BUILD_OBJECT('id', t6.id, 'name', t6.name)) AS Tags`,
      ])
      .leftJoin('t0.userCreator', 't1')
      .leftJoin('t1.imgAvatar', 't2')
      .leftJoin('t0.coments', 't3', 't3.isDelated = :isDelated', {
        isDelated: false,
      })
      .leftJoin('t0.likes', 't4')
      .leftJoin('t0.tags', 't5')
      .innerJoin('t5.tag', 't6')
      .groupBy('t0.id')
      .addGroupBy('t1.id')
      .addGroupBy('t2.formatedTitle')
      .orderBy('t0.createdAT', 'DESC')
      .where('t1.id = :id', {
        id: Id,
      })
      .getRawMany();

    const postsModel: PostModel[] = [];
    posts.forEach((post) => {
      let userModel = new UserPostModel(
        post.userid,
        post.name,
        post.lastname,
        post.username,
        post.email,
        post.useravatar,
      );

      let tags: TagModel[] = [];
      post.tags.forEach((tag) => {
        let tagModel = new TagModel(tag.id, tag.name);
        tags.push(tagModel);
      });

      let postModel = new PostModel(
        post.idpost,
        post.title,
        tags,
        post.datecreate,
        userModel,
        post.commentscount,
        post.likescount,
      );

      postsModel.push(postModel);
    });
    return postsModel;
  }

  /*   async getAllPost() {
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
  } */

  async getById(id: number) {
    const Id = await BigInt(id);

    const post = await this.postRepository.findOne({
      where: {
        id: Id,
      },
      relations: ['userCreator', 'userCreator.imgAvatar', 'coments'],
    });

    const tags = await this.postTag.find({
      where: {
        post: { id: post.id },
      },
      relations: ['tags'],
    });

    const tagsList: TagModel[] =
      tags.length > 0
        ? tags.map((tag) => new TagModel(tag.tag.id, tag.tag.name))
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
