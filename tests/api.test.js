// ./tests/api.test.js

// Author - Brett DeWitt
// Created - Saturday, December 7, 2024, 11:45:00 AM
// Integration tests for the VisuaLoom back-end API
// Tests critical routes for GET and POST of Users, Artworks, and Likes



const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const axios = require('axios');


// ---------------------- Test Setup ----------------------
/**
 * Sets up the API client for the tests.
 * Initializes axios with base URL and headers for the requests.
 */
let apiClient;


/**
 * Resets the database before each test to ensure test isolation.
 * Sends a request to the '/admin/resetdb' route to clear any existing data.
 */
beforeAll(() => {
    // Initialize the client
    apiClient = axios.create({
        baseURL: 'http://localhost:3001',
        headers: {
            'content-type': 'application/json',
        },
    });
});

beforeEach(async () => {
    // reset the db before each test
    const response = await apiClient.get('/admin/resetdb');
})


/**
 * Test the 'CREATE /users' route to ensure a new user is created successfully.
 * Verifies that the returned user matches the input data.
 */
test('CREATE /users should return the created user', async () => {

    // Arrange
    const user = {
        googleId: "12345",
        email: "user@example.com",
        name: "Test User",
    }

    // Act
    const response = await apiClient.post(`/users`, user);

    // Assert
    expect(response.status).toBe(201);
    expect(response.data).toEqual(
        expect.objectContaining(user)
    );
});


/**
 * Test the 'GET /users/:id' route to ensure it returns the correct user by ID.
 * Verifies the user data matches the expected values.
 */
test('GET /user:id should return the user with that id', async () => {
    // Arrange
    const response_post = await apiClient.post(`/users`, {
        googleId: "12345",
        email: "user@example.com",
        name: "Test User",
    });

    const userId = response_post.data.id;

    // Act
    const response_get = await apiClient.get(`/users/${userId}`);

    // Assert
    expect(response_get.status).toBe(200);
    expect(response_get.data.googleId).toEqual("12345");
    expect(response_get.data.email).toEqual("user@example.com");
    expect(response_get.data.name).toEqual("Test User");
});


/**
 * Test the 'CREATE /artworks' route to ensure a new artwork is created successfully.
 * Verifies that the artwork data matches the input data, including properly formatted JSON fields.
 */
test('CREATE /artwork should return the created artwork', async () => {
    // Arrange
    const response_user_post = await apiClient.post(`/users`, {
        googleId: "12345",
        email: "user@example.com",
        name: "Test User",
    });

    const userId = response_user_post.data.id;

    const artwork = {
        userId: userId,
        algorithm: "algorithm",
        exifData: {"key" : "value"},
        pixelCluster: {"key" : "value"},
        colorPalette: {"key" : "value"}
    }

    // Act
    const response_artwork_post = await apiClient.post(`/artworks`, artwork)

    // Assert
    expect(response_artwork_post.status).toBe(201);
    expect(response_artwork_post.data).toEqual(
        expect.objectContaining({
            ...artwork,
            exifData: JSON.stringify(artwork.exifData),
            pixelCluster: JSON.stringify(artwork.pixelCluster),
            colorPalette: JSON.stringify(artwork.colorPalette)
        })
    );
})


/**
 * Test the 'GET /artworks/:id' route to ensure it returns the correct artwork by ID.
 * Verifies the artwork data matches the expected values, including proper JSON field formatting.
 */
test('GET /artwork/:id should return the artwork with id', async () => {

    // Arrange
    const response_user_post = await apiClient.post(`/users`, {
        googleId: "12345",
        email: "user@example.com",
        name: "Test User",
    });

    const userId = response_user_post.data.id;

    const artwork = {
        userId: userId,
        algorithm: "algorithm",
        exifData: {"key" : "value"},
        pixelCluster: {"key" : "value"},
        colorPalette: {"key" : "value"}
    };

    const response_artwork_post = await apiClient.post(`/artworks`, artwork);

    const artworkId = response_artwork_post.data.id;

    // Act
    const response_artwork_get = await apiClient.get(`/artworks/${artworkId}`);

    // Assert
    expect(response_artwork_get.status).toBe(200);
    expect(response_artwork_get.data).toEqual(
        expect.objectContaining({
            ...artwork,
            exifData: JSON.stringify(artwork.exifData),
            pixelCluster: JSON.stringify(artwork.pixelCluster),
            colorPalette: JSON.stringify(artwork.colorPalette)
        })
    );
})


/**
 * Test the 'POST /likes' route to ensure a new like is created successfully.
 * Verifies that the like data matches the input data.
 */
test('POST /like should return the created like', async () => {
    // Arrange
    const response_user_post = await apiClient.post(`/users`, {
        googleId: "12345",
        email: "user@example.com",
        name: "Test User",
    });

    const userId = response_user_post.data.id;

    const artwork = {
        userId: userId,
        algorithm: "algorithm",
        exifData: {"key" : "value"},
        pixelCluster: {"key" : "value"},
        colorPalette: {"key" : "value"}
    };

    const response_artwork_post = await apiClient.post(`/artworks`, artwork);

    const artworkId = response_artwork_post.data.id;

    const like = {
        userId,
        artworkId,
    }

    // Act
    const response_like_post = await apiClient.post('/likes', like);

    // Assert
    expect(response_like_post.status).toBe(201);
    expect(response_like_post.data).toEqual(
        expect.objectContaining(like)
    );
})
