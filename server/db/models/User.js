module.exports = function(sequelizeConnection, sequelizeObj) {
    let User = sequelizeConnection.define('users', {
        id: {
            type: sequelizeObj.UUID,
            defaultValue: sequelizeObj.UUIDV1,
            primaryKey: true,
            unique: true,
        },
        firstName: {
            type: sequelizeObj.STRING,
            allowNull: false,
        },
        lastName: {
            type: sequelizeObj.STRING,
            allowNull: false,
        },
        email: {
            type: sequelizeObj.STRING,
            unique: true,
            allowNull: false,
        }
    }, 
    {
        //tableName: 'users',
        timestamps: false,
    })

    User.associate = function(Models){
        User.hasOne(Models.Login);
    }

    return User;

}

