import { MigrationInterface, QueryRunner } from "typeorm";

export class InitiDb1728599227182 implements MigrationInterface {
    name = 'InitiDb1728599227182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."link_icon_enum" AS ENUM('1', '2', '3', '4', '5', '6')`);
        await queryRunner.query(`CREATE TABLE "link" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAT" TIMESTAMP NOT NULL DEFAULT now(), "updateAT" TIMESTAMP NOT NULL DEFAULT now(), "is_delated" boolean NOT NULL DEFAULT false, "title" character varying NOT NULL, "href" character varying NOT NULL, "icon" "public"."link_icon_enum" NOT NULL, "user_id" uuid, CONSTRAINT "PK_26206fb7186da72fbb9eaa3fac9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."document_file_extencion_enum" AS ENUM('pdf', 'docx', 'png', 'jpg', 'xlsx', 'pptx')`);
        await queryRunner.query(`CREATE TYPE "public"."document_document_type_enum" AS ENUM('img-avatar', 'img-hero', 'document')`);
        await queryRunner.query(`CREATE TABLE "document" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAT" TIMESTAMP NOT NULL DEFAULT now(), "updateAT" TIMESTAMP NOT NULL DEFAULT now(), "is_delated" boolean NOT NULL DEFAULT false, "title" character varying NOT NULL, "description" character varying NOT NULL, "formated_title" character varying NOT NULL, "file_extencion" "public"."document_file_extencion_enum" NOT NULL, "formated_titlePDF" character varying NOT NULL, "document_type" "public"."document_document_type_enum" NOT NULL, "file_size" character varying NOT NULL, "userCreatorId" uuid NOT NULL, CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAT" TIMESTAMP NOT NULL DEFAULT now(), "updateAT" TIMESTAMP NOT NULL DEFAULT now(), "is_delated" boolean NOT NULL DEFAULT false, "content" character varying(250) NOT NULL, "post" uuid NOT NULL, "user_creator" uuid NOT NULL, CONSTRAINT "PK_5091d71989f6edd5e5d3e928a71" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAT" TIMESTAMP NOT NULL DEFAULT now(), "updateAT" TIMESTAMP NOT NULL DEFAULT now(), "is_delated" boolean NOT NULL DEFAULT false, "name" character varying NOT NULL, CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_hashtag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAT" TIMESTAMP NOT NULL DEFAULT now(), "updateAT" TIMESTAMP NOT NULL DEFAULT now(), "is_delated" boolean NOT NULL DEFAULT false, "post_id" uuid, "tag_id" uuid, CONSTRAINT "PK_05cb9053bd41f174f91053e0b0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "like" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "post_id" uuid, "user_id" uuid, CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAT" TIMESTAMP NOT NULL DEFAULT now(), "updateAT" TIMESTAMP NOT NULL DEFAULT now(), "is_delated" boolean NOT NULL DEFAULT false, "content_post" character varying NOT NULL, "user_creator" uuid NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rol_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAT" TIMESTAMP NOT NULL DEFAULT now(), "updateAT" TIMESTAMP NOT NULL DEFAULT now(), "is_delated" boolean NOT NULL DEFAULT false, "name" character varying(20) NOT NULL, "description" character varying(254) NOT NULL, "level" integer NOT NULL, CONSTRAINT "PK_76d5c66bb53107c08c79896b249" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAT" TIMESTAMP NOT NULL DEFAULT now(), "updateAT" TIMESTAMP NOT NULL DEFAULT now(), "is_delated" boolean NOT NULL DEFAULT false, "name" character varying(40) NOT NULL, "lastname" character varying(40) NOT NULL, "userName" character varying(20) NOT NULL, "email" character varying NOT NULL, "password" character varying(30) NOT NULL, "description" character varying(500), "validate_email" boolean NOT NULL DEFAULT false, "imgHeroId" uuid, "imgAvatarId" uuid, "RolId" uuid NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "link" ADD CONSTRAINT "FK_da35233ec2bfaa121bb3540039b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_a2c400b48a43bfcb0d41b288c77" FOREIGN KEY ("userCreatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coment" ADD CONSTRAINT "FK_44dc6856b9b021ce93f35d5e109" FOREIGN KEY ("post") REFERENCES "post"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coment" ADD CONSTRAINT "FK_37b4d8482571ec5969d7b6e2ef3" FOREIGN KEY ("user_creator") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_hashtag" ADD CONSTRAINT "FK_a855b00dfa76d3dd76a554a0e7d" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_hashtag" ADD CONSTRAINT "FK_c50bc61df99644102049bd529a5" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_d41caa70371e578e2a4791a88ae" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "like" ADD CONSTRAINT "FK_4356ac2f9519c7404a2869f1691" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_8aca0693dd546f974ae2ab8a6cf" FOREIGN KEY ("user_creator") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e136818382afc2cfbbf7ca7bd8e" FOREIGN KEY ("imgHeroId") REFERENCES "document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_2394c87479e64531fe995d0e988" FOREIGN KEY ("imgAvatarId") REFERENCES "document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6c9eedda3564670ef8c6a4ca12a" FOREIGN KEY ("RolId") REFERENCES "rol_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6c9eedda3564670ef8c6a4ca12a"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_2394c87479e64531fe995d0e988"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e136818382afc2cfbbf7ca7bd8e"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_8aca0693dd546f974ae2ab8a6cf"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_4356ac2f9519c7404a2869f1691"`);
        await queryRunner.query(`ALTER TABLE "like" DROP CONSTRAINT "FK_d41caa70371e578e2a4791a88ae"`);
        await queryRunner.query(`ALTER TABLE "post_hashtag" DROP CONSTRAINT "FK_c50bc61df99644102049bd529a5"`);
        await queryRunner.query(`ALTER TABLE "post_hashtag" DROP CONSTRAINT "FK_a855b00dfa76d3dd76a554a0e7d"`);
        await queryRunner.query(`ALTER TABLE "coment" DROP CONSTRAINT "FK_37b4d8482571ec5969d7b6e2ef3"`);
        await queryRunner.query(`ALTER TABLE "coment" DROP CONSTRAINT "FK_44dc6856b9b021ce93f35d5e109"`);
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_a2c400b48a43bfcb0d41b288c77"`);
        await queryRunner.query(`ALTER TABLE "link" DROP CONSTRAINT "FK_da35233ec2bfaa121bb3540039b"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "rol_user"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "like"`);
        await queryRunner.query(`DROP TABLE "post_hashtag"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "coment"`);
        await queryRunner.query(`DROP TABLE "document"`);
        await queryRunner.query(`DROP TYPE "public"."document_document_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."document_file_extencion_enum"`);
        await queryRunner.query(`DROP TABLE "link"`);
        await queryRunner.query(`DROP TYPE "public"."link_icon_enum"`);
    }

}
