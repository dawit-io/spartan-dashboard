import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowUp,
  lucideArrowDown,
  lucideUsers,
  lucideTrendingUp,  // Replacement for lucideLineChart
  lucidePresentation,  // Replacement for lucideBarChart
  lucideDollarSign,
  lucideActivity,
  lucideCalendar
} from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmIconDirective } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-featured-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    HlmButtonDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardFooterDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmIconDirective
  ],
  providers: [
    provideIcons({
      lucideArrowUp,
      lucideArrowDown,
      lucideUsers,
      lucideTrendingUp,
      lucidePresentation,
      lucideDollarSign,
      lucideActivity,
      lucideCalendar
    })
  ],
  template: `
    <div class="p-4 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-3xl font-bold">Dashboard</h2>
        <div class="flex space-x-2">
          <button hlmBtn variant="outline">
            <ng-icon hlm size="sm" name="lucideCalendar" class="mr-2"></ng-icon>
            January 10 - February 10
          </button>
          <button hlmBtn>
            Download Report
          </button>
        </div>
      </div>

      <!-- Metrics Row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Revenue Card -->
        <section hlmCard>
          <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
            <div class="flex flex-col space-y-1">
              <h3 hlmCardTitle>Revenue</h3>
              <p hlmCardDescription>Monthly revenue</p>
            </div>
            <div class="p-2 bg-primary/10 rounded-full">
              <ng-icon hlm size="lg" name="lucideDollarSign" class="text-primary"></ng-icon>
            </div>
          </div>
          <div hlmCardContent>
            <div class="text-2xl font-bold">$45,231.89</div>
            <div class="flex items-center pt-1 text-sm text-green-500">
              <ng-icon hlm size="sm" name="lucideArrowUp"></ng-icon>
              <span class="ml-1">+20.1% from last month</span>
            </div>
          </div>
        </section>

        <!-- Customers Card -->
        <section hlmCard>
          <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
            <div class="flex flex-col space-y-1">
              <h3 hlmCardTitle>Customers</h3>
              <p hlmCardDescription>Active users</p>
            </div>
            <div class="p-2 bg-primary/10 rounded-full">
              <ng-icon hlm size="lg" name="lucideUsers" class="text-primary"></ng-icon>
            </div>
          </div>
          <div hlmCardContent>
            <div class="text-2xl font-bold">+2,350</div>
            <div class="flex items-center pt-1 text-sm text-green-500">
              <ng-icon hlm size="sm" name="lucideArrowUp"></ng-icon>
              <span class="ml-1">+18.2% from last month</span>
            </div>
          </div>
        </section>

        <!-- Conversion Card -->
        <section hlmCard>
          <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
            <div class="flex flex-col space-y-1">
              <h3 hlmCardTitle>Conversion</h3>
              <p hlmCardDescription>Conversion rate</p>
            </div>
            <div class="p-2 bg-primary/10 rounded-full">
              <ng-icon hlm size="lg" name="lucideActivity" class="text-primary"></ng-icon>
            </div>
          </div>
          <div hlmCardContent>
            <div class="text-2xl font-bold">3.8%</div>
            <div class="flex items-center pt-1 text-sm text-red-500">
              <ng-icon hlm size="sm" name="lucideArrowDown"></ng-icon>
              <span class="ml-1">-1.1% from last month</span>
            </div>
          </div>
        </section>

        <!-- Sessions Card -->
        <section hlmCard>
          <div hlmCardHeader class="flex flex-row items-center justify-between pb-2">
            <div class="flex flex-col space-y-1">
              <h3 hlmCardTitle>Sessions</h3>
              <p hlmCardDescription>Average sessions</p>
            </div>
            <div class="p-2 bg-primary/10 rounded-full">
              <ng-icon hlm size="lg" name="lucidePresentation" class="text-primary"></ng-icon>
            </div>
          </div>
          <div hlmCardContent>
            <div class="text-2xl font-bold">24.7k</div>
            <div class="flex items-center pt-1 text-sm text-green-500">
              <ng-icon hlm size="sm" name="lucideArrowUp"></ng-icon>
              <span class="ml-1">+10.3% from last month</span>
            </div>
          </div>
        </section>
      </div>

      <!-- Chart and Table Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Chart Section (2/3 width) -->
        <section hlmCard class="lg:col-span-2">
          <div hlmCardHeader>
            <h3 hlmCardTitle>Revenue Overview</h3>
            <p hlmCardDescription>Monthly revenue for the past year</p>
          </div>
          <div hlmCardContent>
            <!-- Placeholder for chart -->
            <div class="h-80 bg-muted/20 rounded-md flex items-center justify-center">
              <div class="text-muted-foreground">Revenue Chart Placeholder</div>
            </div>
          </div>
        </section>

        <!-- Latest Activity (1/3 width) -->
        <section hlmCard>
          <div hlmCardHeader>
            <h3 hlmCardTitle>Recent Activity</h3>
            <p hlmCardDescription>Latest transactions and events</p>
          </div>
          <div hlmCardContent>
            <div class="space-y-4">
              <!-- Activity Items -->
              <div class="flex items-start space-x-3">
                <div class="p-2 bg-primary/10 rounded-full">
                  <ng-icon hlm size="md" name="lucideDollarSign" class="text-primary"></ng-icon>
                </div>
                <div>
                  <p class="font-medium">New Purchase</p>
                  <p class="text-sm text-muted-foreground">User #1204 purchased Premium Plan</p>
                  <p class="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div class="p-2 bg-primary/10 rounded-full">
                  <ng-icon hlm size="md" name="lucideUsers" class="text-primary"></ng-icon>
                </div>
                <div>
                  <p class="font-medium">New Customer</p>
                  <p class="text-sm text-muted-foreground">Company XYZ registered</p>
                  <p class="text-xs text-muted-foreground mt-1">15 minutes ago</p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <div class="p-2 bg-primary/10 rounded-full">
                  <ng-icon hlm size="md" name="lucideActivity" class="text-primary"></ng-icon>
                </div>
                <div>
                  <p class="font-medium">System Update</p>
                  <p class="text-sm text-muted-foreground">Version 2.1.0 deployed successfully</p>
                  <p class="text-xs text-muted-foreground mt-1">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
          <div hlmCardFooter>
            <button hlmBtn variant="outline" class="w-full">View All Activity</button>
          </div>
        </section>
      </div>

      <!-- Bottom Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Popular Products -->
        <section hlmCard>
          <div hlmCardHeader>
            <h3 hlmCardTitle>Popular Products</h3>
            <p hlmCardDescription>Top selling products this month</p>
          </div>
          <div hlmCardContent>
            <div class="space-y-3">
              <div class="flex items-center justify-between border-b pb-3">
                <div>
                  <p class="font-medium">Product Alpha</p>
                  <p class="text-sm text-muted-foreground">Category: Electronics</p>
                </div>
                <div class="text-right">
                  <p class="font-medium">$420.80</p>
                  <p class="text-sm text-green-500">+12%</p>
                </div>
              </div>

              <div class="flex items-center justify-between border-b pb-3">
                <div>
                  <p class="font-medium">Product Beta</p>
                  <p class="text-sm text-muted-foreground">Category: Fashion</p>
                </div>
                <div class="text-right">
                  <p class="font-medium">$312.40</p>
                  <p class="text-sm text-green-500">+8%</p>
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <p class="font-medium">Product Gamma</p>
                  <p class="text-sm text-muted-foreground">Category: Home Decor</p>
                </div>
                <div class="text-right">
                  <p class="font-medium">$198.20</p>
                  <p class="text-sm text-red-500">-2%</p>
                </div>
              </div>
            </div>
          </div>
          <div hlmCardFooter>
            <button hlmBtn variant="outline" class="w-full">View All Products</button>
          </div>
        </section>

        <!-- Targets -->
        <section hlmCard>
          <div hlmCardHeader>
            <h3 hlmCardTitle>Monthly Targets</h3>
            <p hlmCardDescription>Progress towards monthly goals</p>
          </div>
          <div hlmCardContent>
            <div class="space-y-4">
              <!-- Revenue Target -->
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium">Revenue</span>
                  <span class="text-sm font-medium">78%</span>
                </div>
                <div class="w-full bg-muted rounded-full h-2.5">
                  <div class="bg-green-500 h-2.5 rounded-full" style="width: 78%"></div>
                </div>
              </div>

              <!-- Customers Target -->
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium">New Customers</span>
                  <span class="text-sm font-medium">64%</span>
                </div>
                <div class="w-full bg-muted rounded-full h-2.5">
                  <div class="bg-blue-500 h-2.5 rounded-full" style="width: 64%"></div>
                </div>
              </div>

              <!-- Conversion Target -->
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-medium">Conversion Rate</span>
                  <span class="text-sm font-medium">42%</span>
                </div>
                <div class="w-full bg-muted rounded-full h-2.5">
                  <div class="bg-amber-500 h-2.5 rounded-full" style="width: 42%"></div>
                </div>
              </div>
            </div>
          </div>
          <div hlmCardFooter>
            <button hlmBtn variant="outline" class="w-full">Adjust Targets</button>
          </div>
        </section>
      </div>
    </div>
  `
})
export class FeaturedDashboardComponent {}
