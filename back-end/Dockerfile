FROM rust:slim AS build

RUN useradd -ms /bin/bash d1a
RUN mkdir /back-end && chown d1a:d1a /back-end

USER d1a
WORKDIR /back-end

COPY --chown=d1a:d1a . .

RUN cargo build --release

FROM rust:slim

RUN useradd -ms /bin/bash d1a
RUN mkdir /back-end && chown d1a:d1a /back-end

USER d1a
WORKDIR /back-end

COPY --from=build --chown=d1a:d1a /back-end /back-end

CMD ["cargo", "run", "--release"]