module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)

    // app.route('/tasks')
    //     .all(app.config.passport.authenticate())
    //     .get(app.api.task.getTasks)
    //     .post(app.api.task.save)
        
    // app.route('/tasks/:id')
    //     .all(app.config.passport.authenticate())
    //     .delete(app.api.task.remove)

    // app.route('/tasks/:id/toggle')
    //     .all(app.config.passport.authenticate())
    //     .put(app.api.task.toggleTask)

    app.route('/curso')
        .all(app.config.passport.authenticate())
        .get(app.api.curso.getAllCurso)
        .post(app.api.curso.createCurso)

    app.route('/curso/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.curso.editCurso)        

    app.route('/curso/:id/ativar-desativar')
        .all(app.config.passport.authenticate())        
        .put(app.api.curso.toggleCursoStatus)
}