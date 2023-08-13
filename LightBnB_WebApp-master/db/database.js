const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});


const properties = require("./json/properties.json");
const users = require("./json/users.json");

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const query = 'SELECT * from users WHERE LOWER(email) = LOWER($1)';
  const values = [email];
  return pool.query(query, values)
   .then(result => {
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
    })
    .catch(err => {
     console.log(err.message);
    });
  };

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const query = 'SELECT * from users WHERE id = $1';
  const values = [id];

  return pool.query(query, values)
   .then(result => {
    if(result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
    })
    .catch(err => {
      console.log(err.message);
    })
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const query = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
    `;
   const values = [user.name, user.email, user.password];
   
   return pool.query(query, values)
   .then(result => {
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      throw Error('User insertion failed.');
    }
    })
    .catch(err => {
      console.log(err.message);
    });
   };


/// Reservations


/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const query = `SELECT reservations.id, properties.title, properties.cost_per_night, reservations.start_date, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT $2`;
  const values = [guest_id, limit];

  return pool.query(query, values)
.then(result => result.rows)
.catch(err => {
  console.error(err.message);
  throw err;
});
};

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  
    const queryParams = [];
   
    let queryString = `
    SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    `;
  
   queryString += `WHERE 1 = 1`;

    if (options.city) {
      queryParams.push(`%${options.city}%`);
      queryString += ` AND city LIKE $${queryParams.length} `;
    }

   if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += ` AND owner_id = $${queryParams.length}`;
   }
  
   if (options.minimum_price_per_night && options.maximum_price_per_night) {
      queryParams.push(options.minimum_price_per_night * 100);
      queryParams.push(options.maximum_price_per_night * 100);
      queryString += ` AND cost_per_night BETWEEN $${queryParams.length - 1}AND $${queryParams.length}`;
   }
      if (options.minimum_rating) {
        queryParams.push(options.minimum_rating);
        queryString += ` AND avg(propery_reviews.rating) >= $${queryParams.length}`;
      }

    queryParams.push(limit);
    queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  
  console.log(queryString, queryParams);

  return pool
    .query(queryString, queryParams)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
 const query = `
 INSERT INTO properties (
  owner_id,
  title,
  description,
  thumbnail_photo_url,
  cover_photo_url,
  cost_per_night,
  street,
  city,
  province,
  post_code,
  country,
  parking_spaces,
  number_of_bahtrooms,
  number_of_bedrooms
  )
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
  `;
const values = 
  {
  owner_id: int,
  title: string,
  description: string,
  thumbnail_photo_url: string,
  cover_photo_url: string,
  cost_per_night: string,
  street: string,
  city: string,
  province: string,
  post_code: string,
  country: string,
  parking_spaces: int,
  number_of_bathrooms: int,
  number_of_bedrooms: int
};

 return pool
    .query(query, values)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};