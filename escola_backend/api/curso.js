module.exports = app => {

    const fs = require('fs')
    
    function imageToBase64(imageData) {
        try {            
            const imagemURL = Buffer.from(imageData, 'base64').toString('utf-8')
            return imagemURL
        } catch (error) {
            console.error('Erro ao ler a imagem:', error);
            return null;
        }
    }

    const getAllCurso = async (req, res) => {
       try {
            const cursos = await app.db('curso')

            const cursoBase64 = cursos.map(curso => {
                const cursoCopy = { ...curso };                
                const base64Image = imageToBase64(cursoCopy.imagem);                
                cursoCopy.imagem = base64Image;                 
                return cursoCopy;
            });            

            return res.status(200).json(cursoBase64)
        } catch (error) {
            console.error(error)
            return res.status(500).json({error: 'Internal server error'})
        }
    }

    const createCurso = async (req,res) => {        

        app.db('curso')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))

    }

    const editCurso = async (req,res) => {
        try {
            const { id } = req.params
            const updatedCurso = req.body

            const existingCurso = await app.db('curso').where({id}).first()

            if(!existingCurso) {
                return res.status(404).json({ error: 'Curso não encontrado' })
            }

            await app.db('curso').where({ id }).update(updatedCurso)

            const editedCurso = await app.db('curso').where({ id }).first()
            return res.status(200).json(editedCurso)
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Internal server error' })
        }
    }

    const toggleCursoStatus = async (req, res) => {
        try {
            const {id} = req.params
            const existingCurso = await app.db('curso').where({ id }).first()

            if(!existingCurso) {
                return res.status(400).json({error: 'Curso não encontrado'})
            }

            const newStatus = !existingCurso.ativo
            await app.db('curso').where({ id }).update({ativo: newStatus})

            const updatedCurso = await app.db('curso').where({ id }).first()
            return res.status(200).json(updatedCurso)
        } catch (error) {
            console.error(error)
            return res.status(500).json({error:'Internal server error'})
        }
    }


    return {createCurso, getAllCurso, editCurso, toggleCursoStatus}
}