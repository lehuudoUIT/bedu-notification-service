# Stage 1: Build stage
FROM node:21-alpine AS builder

# Tạo thư mục làm việc
WORKDIR /app

# Copy package*.json, cài đặt dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ source code (trừ những file bị ignore trong .dockerignore)
COPY . .

# Build NestJS (transpile TypeScript -> JavaScript)
RUN npm run build


# Stage 2: Production stage
FROM node:21-alpine AS production

# Tạo thư mục làm việc
WORKDIR /app

# Copy file package*.json để cài đặt gói ở chế độ production
COPY package*.json ./
RUN npm install --only=production

# Copy thư mục dist (sau khi build) từ stage builder
COPY --from=builder /app/dist ./dist

# EXPOSE cổng, nếu microservice lắng nghe cổng (thí dụ 3001)
EXPOSE 3001

# Command khởi chạy microservice
# Giả sử file "main.js" là đầu vào (nằm trong dist/main.js)
CMD ["node", "dist/main"]
