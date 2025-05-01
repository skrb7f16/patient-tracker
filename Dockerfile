# Step 1: Build the React app
FROM node:18 AS builder


WORKDIR /app


COPY package.json package-lock.json ./
RUN npm install


COPY . .

RUN npm run build


FROM nginx:alpine


RUN rm -rf /usr/share/nginx/html/*


COPY --from=builder /app/dist /usr/share/nginx/html


COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
