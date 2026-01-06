# 1. Dependency installation stage
FROM oven/bun:1 as base
WORKDIR /app

# Copy package.json and bun.lockb
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --frozen-lockfile

# 2. Build stage
FROM base as builder
ARG EDGE_STORE_ACCESS_KEY
ARG EDGE_STORE_SECRET_KEY
ARG GITHUB_CLIENT_ID
ARG GITHUB_CLIENT_SECRET
ARG CONVEX_DEPLOYMENT
ARG NEXT_PUBLIC_CONVEX_URL
ARG SITE_URL
ENV EDGE_STORE_ACCESS_KEY=$EDGE_STORE_ACCESS_KEY
ENV EDGE_STORE_SECRET_KEY=$EDGE_STORE_SECRET_KEY
ENV GITHUB_CLIENT_ID=$GITHUB_CLIENT_ID
ENV GITHUB_CLIENT_SECRET=$GITHUB_CLIENT_SECRET
ENV CONVEX_DEPLOYMENT=$CONVEX_DEPLOYMENT
ENV NEXT_PUBLIC_CONVEX_URL=$NEXT_PUBLIC_CONVEX_URL
ENV SITE_URL=$SITE_URL
COPY --from=base /app/node_modules ./node_modules
# Copy source code and dependencies
COPY . .


# Run the build command
RUN bun run build

# 3. Production stage
FROM base as runner
COPY --from=builder /app ./
COPY package.json ./


EXPOSE 3000
CMD ["bun", "run", "dev"]
