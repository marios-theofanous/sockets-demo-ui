<template>
  <v-container>
    <v-card style="height: 50vh;">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 class="message-board">
            <v-progress-circular v-if="isDisconnected" class="disconnected-loader" :value="loadingPercent" size="100">
              Reconnecting...
            </v-progress-circular>
            <div v-for="(message, idx) in messages" :key="idx">
              {{message}}
            </div>
          </v-flex>
          <v-flex xs12>
            <v-form v-model="isFormValid">
              <v-text-field v-model="message"
                            :rules="[v => !!v || '']"
                            placeholder="Message..."
              >
                <v-btn type="submit" slot="append-outer" @click.prevent="sendMessage" :disabled="!isFormValid || isDisconnected">Send
                </v-btn>
              </v-text-field>
            </v-form>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'GeneralChat',
  data () {
    return {
      stompClient: null,
      messages: [],
      message: '',
      isFormValid: false,
      sessionId: '',
      loadingPercent: 0,
      isDisconnected: false
    }
  },
  methods: {
    sendMessage () {
      let object = {
        destination: '/app/general/chat',
        headers: { receipt: this.order },
        body: JSON.stringify({ message: this.message })
      }
      this.stompClient.publish(object)
      this.message = ''
    },
    onStompClientError (event) {
      console.log('Error: ', event)
    },
    onStompClientDisconnect () {
      const timeoutTimer = 10000
      this.loadingPercent = 0
      this.isDisconnected = true
      let interval = setInterval(() => {
        this.loadingPercent += 10
      }, timeoutTimer / 11)
      setTimeout(() => {
        this.connectSocket()
        clearInterval(interval)
      }, timeoutTimer)
    },
    connectSocket () {
      let socket = new SockJS(`http://localhost:8000/gs-guide-websocket?access_token=${this.accessToken}`)
      this.stompClient = Stomp.over(socket)
      this.stompClient.debug = () => {} // Stops debug messages
      this.stompClient.connect({}, () => {
        this.isDisconnected = false
        this.sessionId = this.stompClient.ws._transport.url.split('/')[5]
        this.stompClient.subscribe('/topic/general', (greeting) => {
          let message = JSON.parse(greeting.body)
          this.messages.push(`${message.firstName}: ${message.message} [${moment(message.timestamp).format('DD/MM/YYYY HH:mm')}]`)
        })
        // This is for personal messages. To be used later on for 1 to 1 chats
        this.stompClient.subscribe(`/user/queue/reply`, (msg) => {
          this.messages.push(JSON.parse(msg.body).content)
        })
      }, this.onStompClientError, this.onStompClientDisconnect)
    }
  },
  computed: {
    ...mapState({
      accessToken: state => state.user.accessToken
    })
  },
  mounted () {
    this.connectSocket()
  }
}
</script>

<style scoped>
  .message-board {
    overflow-y: auto;
    height: calc(50vh - 100px);
  }

  .disconnected-loader {
    position: absolute;
    left: 50%;
    bottom: 50%;
    transform: translate(-50%, 50%);
  }
</style>
