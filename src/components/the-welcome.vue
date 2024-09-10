<template>
    <main>
        <header>
            <div id="welcome">
                <i class="nes-icon is-large heart"></i>
                <span class="nes-text welcome-text">WELCOME</span>
                <i class="nes-icon is-large heart"></i>
            </div>
        </header>

        <div id="content" class="nes-container is-dark nes-text">
            <div class="content-wrapper">
                <div class="trophy-container">
                    <i class="nes-icon trophy is-medium"></i>
                    <span id="developerId">Developer</span>
                </div>
                <div class="nes-container is-dark">
                    <div class="profile-container">
                        <img src="../assets/chen.jfif">
                        <div id="card">
                            <h2>John Vincent Jimar</h2>
                            <span>Software Developer</span><br>
                            <nav>
                                <a href="https://github.com/Techies-Demolitions/Nuxt-Todolist">
                                    <i class="nes-icon github is-medium" style="margin-top:10px;"></i>
                                </a>
                                <a href="https://www.linkedin.com/in/johnjimar/">
                                    <i class="nes-icon linkedin is-medium"></i>
                                </a>
                            </nav>
                        </div>
                        <br />
                    </div>
                </div>
                <center class="start-text">
                    <RouterLink to="/catFacts" class="no-link-style">
                        <span class="blink">Click Here To Start</span>
                    </RouterLink>
                </center>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router';

</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/hover.css/2.3.1/css/hover-min.css');

#developerId {
    font-size: x-large;
    margin-left: 10px;
}

/* Flexbox layout for the trophy and developer text */
.trophy-container {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

/* Flexbox layout for profile image and details */
.profile-container {
    display: flex;
    align-items: center;
}

#card {
    display: inline-block;
    margin-left: 10px;
}

nav i {
    margin-left: 10px;
}

main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
    width: 85vw;
}

#welcome {
    font-size: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 3vh;
}

.welcome-text {
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    border-right: 3px solid;
    width: 7ch;
    animation: typing 10s steps(7, end) 10s infinite alternate, blink-caret 0.75s step-end infinite;
}

@keyframes typing {
    0% {
        width: 0;
    }

    50% {
        width: 7ch;
    }

    100% {
        width: 0;
    }
}

@keyframes blink-caret {

    from,
    to {
        border-color: transparent;
    }

    50% {
        border-color: black;
    }
}

#content {
    width: 40%;
    height: 40vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.start-text {
    margin-top: 1vw;
}

#content img {
    height: 100px;
    width: 100px;
}

/* Remove hyperlink styles */
.no-link-style {
    text-decoration: none;
    color: inherit;
}

/* Blinking effect for Click Here To Start */
.blink:hover {
    animation: blink 1s infinite;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}
</style>
