module.exports = function(sequelizeConnection, sequelizeObj) {
    let Login = sequelizeConnection.define('Login', {
        loginId: {
            type: sequelizeObj.UUID,
            defaultValue: sequelizeObj.UUIDV1,
            primaryKey: true,
            unique: true,
        },
        password: {
            type: sequelizeObj.STRING,
            allowNull: false,
        }
    }, 
    {
        timestamps: false,
    });

    Login.associate = function(Models){
        Login.belongsTo(Models.User,  { foreignKey: { allowNull: false }, onDelete: 'cascade' });
    }

    return Login;
}

