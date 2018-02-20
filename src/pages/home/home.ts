import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Manipulating_video_using_canvas
  //https://www.youtube.com/watch?v=yDgbt4SAjIc 17
  @ViewChild('videoPlayer') mVideoPlayer: any;
  @ViewChild('canvas1') mCanvas1: any;
  @ViewChild('canvas2') mCanvas2: any;

  public urlVideo: string;
  public videoPlayer: any;
  public c1: any;
  public c2: any;

  constructor(public navCtrl: NavController) {
    this.urlVideo = 'https://videoaulas.infra.grancursosonline.com.br/564afe295161b94c3dcc76ab8ec071b3/eab5ebae49838bfc0226ada30231e6bc/eab5ebae49838bfc0226ada30231e6bc.mp4';
  }

  ngOnInit() {
    this.videoPlayer = this.mVideoPlayer.nativeElement;
    this.c1 = this.mCanvas1.nativeElement;
    this.c2 = this.mCanvas2.nativeElement;

    let cxt1 = this.c1.getContext('2d');
    let cxt2 = this.c2.getContext('2d');

    this.videoPlayer.src = this.urlVideo;
    let width, height;
    this.videoPlayer.onplay = () => {
      console.log(this.videoPlayer.videoWidth);
      width = this.videoPlayer.videoWidth / 2;
      console.log(this.videoPlayer.videoHeight);
      height = this.videoPlayer.videoHeight / 2;
      this.timerCallback();
    };

    this.videoPlayer.onpause = () => {
    }
  }

  timerCallback() {
    if (this.videoPlayer.paused || this.videoPlayer.ended) {
      return;
    }

    this.computeFrame();
    let self = this;
    setTimeout(function() {
      self.timerCallback();
    }, 0);
  }

  changeSpeed(speed: number) {
    this.videoPlayer.playbackRate = speed;
  }

  backTime(time) {
    this.videoPlayer.currentTime += -time;
  }
}
