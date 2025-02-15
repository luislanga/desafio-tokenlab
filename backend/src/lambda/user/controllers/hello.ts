export const handler = async (event: any) => {
    return JSON.stringify({
        statusCode: 200,
        message: "hello from lambda"
    })
}