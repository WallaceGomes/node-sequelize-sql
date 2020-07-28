const Tech = require('../models/Tech');
const User = require('../models/User');

module.exports = {

    async index(req, res) {
        const { user_id } = req.params;

        //para não retornar nada da associação => through: { attributes: [] }
        const user = await User.findByPk(user_id, {
            include: { association: 'techs', through: { attributes: [] } }
        });

        if(!user){
            return res.status(400).json({error: 'User not found' });
        }

        //const addresses = await Address.findAll({ where: { user_id }})

        return res.json(user.techs);
    },

    async store(req, res){
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if(!user){
            return res.status(400).json({error: 'User not found' });
        }

        //se não encontrar a technologia no banco, cria, o retorno é o que foi criado ou encontrado
        //e um boolean = criado ou encontrado?
        const [ tech ] = await Tech.findOrCreate({
            where: { name }
        })

        //em relacionamentos manytomany o sequelize abilita alguns métodos especiais
        await user.addTech(tech);

        return res.json(tech);
    },

    async delete(req,res){
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if(!user){
            return res.status(400).json({error: 'User not found' });
        }

        //se não encontrar a technologia no banco, cria, o retorno é o que foi criado ou encontrado
        //e um boolean = criado ou encontrado?
        const tech = await Tech.findOne({
            where: { name }
        })

        await user.removeTech(tech);

        return res.json();
    }
};
