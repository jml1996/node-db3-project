const { returning } = require('../../data/db-config.js');
const db = require('../../data/db-config.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes')
}

function findById(id) {
    const scheme = db('schemes')
        .where('id', id)
        .first()
    if (!scheme) {
        return Promise.resolve(null)
    } else {
        return scheme
    }
}

function findSteps(id) {
    return db('steps')
        .join('schemes', 'steps.scheme_id', 'schemes.id')
        .select('steps.id', 'steps.instructions', 'steps.step_number', 'schemes.scheme_name')
        .where('scheme_id', id)
        .orderBy('step_number')
}

function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then(ids => {
            return findById(ids[0])
        })
}

function update(changes, id) {
    const scheme_name = changes['scheme_name']
    return db('schemes')
        .where('id', id)
        .update(changes)
        // Probably there is a better way:
        .then(() => {
            return { 'id': id, 'scheme_name': scheme_name }
        })
}

function remove(id) {
    // const deleted = /
    
    return db('schemes')
    .where('id', id)
    .del()
    
    // const toBeRemoved = db('schemes')
    //     .where('id', id)
    //     .first()
    // console.log(toBeRemoved)
    // if (!toBeRemoved) {
    //     return Promise.resolve(null)
    // } else {
    //     db('schemes')
    //         .where('id', id)
    //         .del()
    // }
    // return toBeRemoved
    // if (toBeRemoved['removed']) {
    //     return toBeRemoved['removed']
    // } else {
    //     return Promise.resolve(null)
    // }
}