// ./tests/api.test.js

const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const axios = require('axios');


// integration tests for the VisuaLoom back end tests
// critical routes for GET and POST of Users and Artworks,
// as well as POST of Likes.


let apiClient;

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
