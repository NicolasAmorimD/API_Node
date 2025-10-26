const http = require('http')
const routes = require('./routes')
const { URL } = require('url')

const bodyParser = require('./helpers/bodyParser')

const server = http.createServer((request, response) => {
    const parsedUrl = new URL(`http://localhost:3000${request.url}`) 
    // console.log(Object.fromEntries(parsedUrl.searchParams))
    // console.log(request.url)
    console.log(`Method: ${request.method} | Url: ${parsedUrl.pathname}`)

    let { pathname } = parsedUrl
    let id = null

    const splitEndpoint = pathname.split('/').filter(Boolean)

    if(splitEndpoint.length > 1) {
        pathname = `/${splitEndpoint[0]}/:id`
        id = splitEndpoint[1]
    }
 
    const route = routes.find((routeObj) => {
        return routeObj.method === request.method && routeObj.endpoint === pathname
    })

    if(route) {
        request.query = Object.fromEntries(parsedUrl.searchParams)
        request.params = {id}
        // console.log(request.query)
        response.send = (statusCode, body) => {
            response.writeHead(statusCode, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify( body ))
        }

        if(request.method === 'POST' || request.method === 'PUT') {
            bodyParser(request, () => route.handler(request, response))
        } else {
            route.handler(request, response)
        }

    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' })
        response.end(`Cannot ${request.method} ${parsedUrl.pathname}`)
    }
})

server.listen(3000, function callback() {
    console.log('server is running at localhost:3000')
})