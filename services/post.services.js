const {dataSource} = require('../connect');
const PostEntity = require('../model/Post').PostEntity;

function create(data) {
    console.log(">>>", data);
    const result = dataSource
        .getRepository(PostEntity)
        .save(data)
        .catch(error => console.log("Problem in saving post", error));
    return result;
}

function findAll() {
    const result = dataSource
        .getRepository(PostEntity)
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.categories", "category")
        .getMany()
    return result;
}

function findOne(id) {
    const result = dataSource
        .getRepository(PostEntity)
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.categories", "category")
        .where('post.id = :id', {id: id})
        .getOne()
    return result
}

function updatePost(data) {
    const result = dataSource
        .getRepository(PostEntity)
        .createQueryBuilder()
        .update(PostEntity)
        .set({
            title: data.title,
            text: data.text
        })
        .where('id= :id', {id: data.id})
        .execute()
        .catch(error => console.log(error));
    return result;
}

async function updateCategory(data){
    const actualRelationships =await dataSource
        .getRepository(PostEntity)
        .createQueryBuilder()
        .relation(PostEntity, "categories")
        .of(data.id)
        .loadMany()
    console.log("1>>>", actualRelationships);

    const result = await dataSource
        .getRepository(PostEntity)
        .createQueryBuilder()
        .relation(PostEntity, "categories")
        .of(data.id)
        .addAndRemove(data.categories, actualRelationships)
        .catch((error) => console.log("Cannot update categories", error));
    
    console.log("2>>>", result);    
    return result;
}


function deletePost(value) {
    const result = dataSource
        .getRepository(PostEntity)
        .createQueryBuilder()
        .delete()
        .from(PostEntity)
        .where('id = :id', {id : id})
        .execute()
        .catch(error => console.log(error));
    return result;
}

function deleteCategories(data) {
    const result = dataSource
        .getRepository(PostEntity)
        .createQueryBuilder()
        .relation(PostEntity, "categories")
        .of(data)
        .remove(data.categories)
        .catch(error => console.log(error));
    return result;    
}

module.exports = {create, findAll, findOne, updatePost, updateCategory, deletePost, deleteCategories}
